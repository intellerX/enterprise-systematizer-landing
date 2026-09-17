import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { en } from "@/i18n/en";

export const metadata: Metadata = {
  title: "AI Maturity Assessment",
  description: en.assessment.intro,
};

export default function AssessmentPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Self-service</p>
          <h1>{en.assessment.title}</h1>
          <p>{en.assessment.intro}</p>
        </div>
        <AssessmentWizard />
      </div>
    </section>
  );
}
