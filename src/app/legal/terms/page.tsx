import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalShell title="Terms">
      <p>
        Placeholder terms of use for the marketing site and consultation
        requests. Replace with counsel-approved terms before production launch.
      </p>
    </LegalShell>
  );
}
