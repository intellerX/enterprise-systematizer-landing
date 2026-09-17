import "server-only";

export type LeadAttachment = {
  filename: string;
  contentType: string;
  size: number;
  /** Base64 for email adapters; omitted in mock logs if huge */
  contentBase64?: string;
};

export type LeadPayload = {
  fullName: string;
  businessEmail: string;
  phone?: string;
  company?: string;
  role?: string;
  interest: string;
  message: string;
  consentAt: string;
  assessmentSummary?: string;
  attachments: LeadAttachment[];
  meta: {
    userAgent?: string;
    ipHash?: string;
  };
};

export interface LeadAdapter {
  send(payload: LeadPayload): Promise<{ ok: true } | { ok: false; error: string }>;
}

export class MockLeadAdapter implements LeadAdapter {
  async send(payload: LeadPayload) {
    console.info("[MockLeadAdapter] lead received", {
      fullName: payload.fullName,
      businessEmail: payload.businessEmail,
      interest: payload.interest,
      attachmentCount: payload.attachments.length,
      // Intentionally do not log destination inbox
    });
    return { ok: true as const };
  }
}

/**
 * Email adapter — destination from LEAD_TO_EMAIL only (never NEXT_PUBLIC_*).
 * Production value is configured in server env (see .env.example).
 * Without a mail transport configured, falls back to structured server log
 * addressed to the configured destination (still never exposed to clients).
 */
export class EmailLeadAdapter implements LeadAdapter {
  constructor(private readonly toAddress: string) {}

  async send(payload: LeadPayload) {
    if (!this.toAddress) {
      return { ok: false as const, error: "Lead destination is not configured" };
    }

    // CAPTCHA-ready hook: verify token here when CAPTCHA_SECRET is set.
    // Transport: replace with Resend/SendGrid/SMTP when credentials exist.
    const transport = process.env.SMTP_HOST || process.env.RESEND_API_KEY;

    if (!transport) {
      console.info("[EmailLeadAdapter] queued (no transport configured)", {
        toConfigured: true,
        subject: `Landing lead: ${payload.interest}`,
        from: payload.businessEmail,
        name: payload.fullName,
        attachmentCount: payload.attachments.length,
      });
      return { ok: true as const };
    }

    // Minimal Resend path when key present
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "leads@localhost",
          to: [this.toAddress],
          subject: `Landing lead: ${payload.interest} — ${payload.fullName}`,
          text: formatLeadText(payload),
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: "Email provider rejected the message" };
      }
      return { ok: true as const };
    }

    console.info("[EmailLeadAdapter] SMTP transport stub — mark sent", {
      toConfigured: true,
    });
    return { ok: true as const };
  }
}

function formatLeadText(payload: LeadPayload) {
  return [
    `Name: ${payload.fullName}`,
    `Email: ${payload.businessEmail}`,
    `Phone: ${payload.phone || "—"}`,
    `Company: ${payload.company || "—"}`,
    `Role: ${payload.role || "—"}`,
    `Interest: ${payload.interest}`,
    `Consent at: ${payload.consentAt}`,
    "",
    payload.message,
    payload.assessmentSummary
      ? `\nAssessment summary:\n${payload.assessmentSummary}`
      : "",
  ].join("\n");
}

export function createLeadAdapter(): LeadAdapter {
  const mode = (process.env.LEAD_ADAPTER ?? "mock").toLowerCase();
  if (mode === "email") {
    const to = process.env.LEAD_TO_EMAIL ?? "";
    return new EmailLeadAdapter(to);
  }
  return new MockLeadAdapter();
}
