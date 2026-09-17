import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <p>
        Legal entity details TBD. This placeholder intentionally omits operator
        email addresses; contact is via the consultation form only.
      </p>
    </LegalShell>
  );
}
