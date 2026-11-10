"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export function ServiceEyebrow() {
  const { m } = useI18n();
  return <p className="section__eyebrow">{m.servicePage.eyebrow}</p>;
}

export function ServiceCta() {
  const { m } = useI18n();
  return (
    <Link href="/contact" className="btn btn--primary">
      {m.servicePage.cta}
    </Link>
  );
}

export function AssessmentIntro() {
  const { m } = useI18n();
  return (
    <div className="section__head">
      <p className="section__eyebrow">{m.assessment.eyebrow}</p>
      <h1>{m.assessment.title}</h1>
      <p>{m.assessment.intro}</p>
    </div>
  );
}

export function NotFoundContent() {
  const { m } = useI18n();
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "36rem" }}>
        <p className="section__eyebrow">{m.notFound.eyebrow}</p>
        <h1>{m.notFound.title}</h1>
        <p>{m.notFound.body}</p>
        <p style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--primary">
            {m.notFound.home}
          </Link>
          <Link href="/#contacto" className="btn btn--ghost">
            {m.notFound.contact}
          </Link>
        </p>
      </div>
    </section>
  );
}
