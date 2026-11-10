"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { getLanding } from "@/content/landing";
import { useI18n } from "@/i18n/I18nProvider";

export function ContactScreen() {
  const params = useSearchParams();
  const { locale } = useI18n();
  const copy = getLanding(locale);
  const message = params.get("message") ?? "";

  return (
    <section className="section" id="contacto">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.contact.eyebrow}</p>
          <h1>{copy.contact.title}</h1>
          <p>{copy.contact.intro}</p>
        </div>
        <ContactForm
          initialMessage={message}
          assessmentSummary={params.get("assessment") ? message : undefined}
        />
      </div>
    </section>
  );
}
