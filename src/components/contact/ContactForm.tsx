"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { site } from "@/content/site";
import { en } from "@/i18n/en";
import { track } from "@/lib/analytics/track";
import {
  contactFormSchema,
  MAX_FILES,
  validateFiles,
} from "@/lib/validation/contact";
import styles from "./ContactForm.module.css";

type Props = {
  initialMessage?: string;
  assessmentSummary?: string;
};

export function ContactForm({ initialMessage = "", assessmentSummary }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);

  const interests = useMemo(() => site.contact.interests, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFormError(null);
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const files = (fd.getAll("files") as File[]).filter((f) => f && f.size > 0);
    const fileError = validateFiles(files);
    if (fileError) {
      setErrors({ files: fileError });
      setStatus("error");
      return;
    }

    const parsed = contactFormSchema.safeParse({
      fullName: fd.get("fullName"),
      businessEmail: fd.get("businessEmail"),
      phone: fd.get("phone") || "",
      company: fd.get("company") || "",
      role: fd.get("role") || "",
      interest: fd.get("interest"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      website: fd.get("website") || "",
      assessmentSummary: assessmentSummary || undefined,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }

    // Rebuild FormData with normalized values
    const body = new FormData();
    Object.entries(parsed.data).forEach(([k, v]) => {
      if (v === undefined || v === false) return;
      body.append(k, String(v));
    });
    files.slice(0, MAX_FILES).forEach((f) => body.append("files", f));

    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setFormError(json.error || en.form.error);
        setStatus("error");
        return;
      }
      track("form_submit", { interest: parsed.data.interest });
      setStatus("success");
      form.reset();
    } catch {
      setFormError(en.form.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3>{en.form.success}</h3>
        <p>We will respond within two business days.</p>
        <Link href="/" className="btn btn--ghost">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <Field
          id="fullName"
          label="Full name"
          required
          error={errors.fullName}
        >
          <input id="fullName" name="fullName" autoComplete="name" required />
        </Field>
        <Field
          id="businessEmail"
          label="Business email"
          required
          error={errors.businessEmail}
        >
          <input
            id="businessEmail"
            name="businessEmail"
            type="email"
            autoComplete="email"
            required
          />
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" />
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="role" label="Role" error={errors.role}>
          <input id="role" name="role" autoComplete="organization-title" />
        </Field>
        <Field id="interest" label="Interest" required error={errors.interest}>
          <select id="interest" name="interest" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="message" label="Message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={initialMessage}
        />
      </Field>
      <Field id="files" label="Attachments (up to 3, ≤ 5 MB total)" error={errors.files}>
        <input id="files" name="files" type="file" multiple />
      </Field>

      {/* Honeypot */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.consent}>
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">
          I agree to the{" "}
          <Link href="/legal/terms">Terms</Link> and{" "}
          <Link href="/legal/privacy">Privacy</Link> notice.
        </label>
      </div>
      {errors.consent ? <p className={styles.error}>{errors.consent}</p> : null}

      {formError ? (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : en.form.submit}
      </button>
      <p className={styles.note}>{site.contact.intro}</p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error ? (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
