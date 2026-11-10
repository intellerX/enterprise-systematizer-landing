"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { site } from "@/content/site";
import { useI18n } from "@/i18n/I18nProvider";
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
  const { m } = useI18n();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);

  function messageFor(key: string, fallback: string) {
    const known = m.form.errors[key as keyof typeof m.form.errors];
    return known ?? fallback;
  }

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
      setErrors({
        files: fileError.includes("5 MB")
          ? m.form.errors.fileSize
          : m.form.errors.fileCount,
      });
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
        next[key] = messageFor(key, issue.message);
      }
      setErrors(next);
      setStatus("error");
      return;
    }

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
        setFormError(res.status === 429 ? m.form.errors.rate : m.form.error);
        setStatus("error");
        return;
      }
      track("form_submit", { interest: parsed.data.interest });
      setStatus("success");
      form.reset();
    } catch {
      setFormError(m.form.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3>{m.form.success}</h3>
        <p>{m.form.successDetail}</p>
        <Link href="/" className="btn btn--ghost">
          {m.form.backHome}
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <Field id="fullName" label={m.form.fullName} required error={errors.fullName}>
          <input id="fullName" name="fullName" autoComplete="name" required />
        </Field>
        <Field
          id="businessEmail"
          label={m.form.businessEmail}
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
        <Field id="phone" label={m.form.phone} error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field id="company" label={m.form.company} error={errors.company}>
          <input id="company" name="company" autoComplete="organization" />
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="role" label={m.form.role} error={errors.role}>
          <input id="role" name="role" autoComplete="organization-title" />
        </Field>
        <Field id="interest" label={m.form.interest} required error={errors.interest}>
          <select id="interest" name="interest" required defaultValue="">
            <option value="" disabled>
              {m.form.interestPlaceholder}
            </option>
            {site.contact.interests.map((value) => (
              <option key={value} value={value}>
                {m.form.interestLabels[value]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="message" label={m.form.message} required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={initialMessage}
        />
      </Field>
      <Field id="files" label={m.form.files} error={errors.files}>
        <input id="files" name="files" type="file" multiple />
      </Field>

      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.consent}>
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">
          {m.form.consentBefore} <Link href="/legal/terms">{m.form.terms}</Link>{" "}
          {m.form.consentAnd} <Link href="/legal/privacy">{m.form.privacy}</Link>.
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
        {status === "loading" ? m.form.sending : m.form.submit}
      </button>
      <p className={styles.note}>{m.form.note}</p>
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
