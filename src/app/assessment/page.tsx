import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { AssessmentIntro } from "@/components/i18n/ServiceBits";
import { getMessages } from "@/i18n/get-messages";

const m = getMessages("es");

export const metadata: Metadata = {
  title: m.assessment.title,
  description: m.assessment.intro,
};

export default function AssessmentPage() {
  return (
    <section className="section">
      <div className="container">
        <AssessmentIntro />
        <AssessmentWizard />
      </div>
    </section>
  );
}
