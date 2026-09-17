import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy">
      <p>
        Placeholder privacy notice. Describe what data the contact form collects,
        retention, and rights. Lead destination addresses are not published on
        this site.
      </p>
    </LegalShell>
  );
}
