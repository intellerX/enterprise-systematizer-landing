import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { getLanding } from "@/content/landing";
import { getLocale } from "@/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getLanding(await getLocale());
  return {
    title: copy.contact.title,
    description: copy.contact.intro,
  };
}

type Props = {
  searchParams: Promise<{ message?: string; assessment?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const copy = getLanding(await getLocale());
  return (
    <section className="section" id="contacto">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.contact.eyebrow}</p>
          <h1>{copy.contact.title}</h1>
          <p>{copy.contact.intro}</p>
        </div>
        <ContactForm
          initialMessage={params.message ?? ""}
          assessmentSummary={params.assessment ? params.message : undefined}
        />
      </div>
    </section>
  );
}
