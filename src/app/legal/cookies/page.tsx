import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalShell title="Cookies">
      <p>
        Essential cookies keep the site working. Analytics cookies load only after
        you accept non-essential cookies. You can change this anytime via Cookie
        preferences in the footer.
      </p>
    </LegalShell>
  );
}
