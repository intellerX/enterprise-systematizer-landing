import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";

export async function generateMetadata(): Promise<Metadata> {
  const m = getMessages(await getLocale());
  return {
    title: m.assessment.title,
    description: m.assessment.intro,
  };
}

export default async function AssessmentPage() {
  const m = getMessages(await getLocale());
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{m.assessment.eyebrow}</p>
          <h1>{m.assessment.title}</h1>
          <p>{m.assessment.intro}</p>
        </div>
        <AssessmentWizard />
      </div>
    </section>
  );
}
