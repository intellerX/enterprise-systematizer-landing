import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createLeadAdapter, type LeadAttachment } from "@/lib/leads/adapter";
import { rateLimit } from "@/lib/leads/rate-limit";
import {
  contactFormSchema,
  MAX_FILES,
  MAX_TOTAL_BYTES,
} from "@/lib/validation/contact";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: `Too many requests. Retry in ${limited.retryAfterSec}s.` },
      { status: 429 },
    );
  }

  // CAPTCHA-ready: if CAPTCHA_SECRET is set, verify token from form here.

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form payload" },
      { status: 400 },
    );
  }

  const honeypot = String(form.get("website") ?? "");
  if (honeypot) {
    // Pretend success to bots
    return NextResponse.json({ ok: true });
  }

  const parsed = contactFormSchema.safeParse({
    fullName: form.get("fullName"),
    businessEmail: form.get("businessEmail"),
    phone: form.get("phone") || "",
    company: form.get("company") || "",
    role: form.get("role") || "",
    interest: form.get("interest"),
    message: form.get("message"),
    consent: form.get("consent") === "true" || form.get("consent") === "on",
    website: "",
    assessmentSummary: form.get("assessmentSummary") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const files = form
    .getAll("files")
    .filter((f): f is File => typeof File !== "undefined" && f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { ok: false, error: `At most ${MAX_FILES} files allowed` },
      { status: 400 },
    );
  }
  const total = files.reduce((s, f) => s + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Total attachment size must be ≤ 5 MB" },
      { status: 400 },
    );
  }

  const attachments: LeadAttachment[] = [];
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      size: file.size,
      contentBase64: buf.toString("base64"),
    });
  }

  const adapter = createLeadAdapter();
  const result = await adapter.send({
    fullName: parsed.data.fullName,
    businessEmail: parsed.data.businessEmail,
    phone: parsed.data.phone || undefined,
    company: parsed.data.company || undefined,
    role: parsed.data.role || undefined,
    interest: parsed.data.interest,
    message: parsed.data.message,
    consentAt: new Date().toISOString(),
    assessmentSummary: parsed.data.assessmentSummary,
    attachments,
    meta: {
      userAgent: req.headers.get("user-agent") ?? undefined,
      ipHash: hashIp(ip),
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function hashIp(ip: string) {
  // Non-cryptographic blur for logs — avoid storing raw IP in lead payload logs
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) | 0;
  return `h${Math.abs(h)}`;
}
