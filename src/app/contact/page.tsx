import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contact.intro,
};

type Props = {
  searchParams: Promise<{ message?: string; assessment?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Contact</p>
          <h1>{site.contact.title}</h1>
          <p>{site.contact.intro}</p>
        </div>
        <ContactForm
          initialMessage={params.message ?? ""}
          assessmentSummary={
            params.assessment ? params.message : undefined
          }
        />
      </div>
    </section>
  );
}
