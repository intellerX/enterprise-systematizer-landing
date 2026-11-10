import { Suspense } from "react";
import type { Metadata } from "next";
import { InsightsList } from "@/components/insights/InsightsList";
import { getMessages } from "@/i18n/get-messages";

const m = getMessages("es");

export const metadata: Metadata = {
  title: m.insightsPage.title,
  description: m.insightsPage.intro,
};

export default function InsightsPage() {
  return (
    <Suspense fallback={null}>
      <InsightsList />
    </Suspense>
  );
}
