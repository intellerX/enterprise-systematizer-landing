"use client";

import { useI18n, I18nProvider } from "@/i18n/I18nProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { CookieBanner } from "./CookieBanner";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <I18nProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </I18nProvider>
  );
}

function SkipLink() {
  const { m } = useI18n();
  return (
    <a className="skip-link" href="#main">
      {m.skip}
    </a>
  );
}
