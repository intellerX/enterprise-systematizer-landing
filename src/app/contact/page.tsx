import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactScreen } from "@/components/contact/ContactScreen";
import { getLanding } from "@/content/landing";

const copy = getLanding("es");

export const metadata: Metadata = {
  title: copy.contact.title,
  description: copy.contact.intro,
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactScreen />
    </Suspense>
  );
}
