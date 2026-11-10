import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";
import { I18nProvider } from "@/i18n/I18nProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { CookieBanner } from "./CookieBanner";

type Props = {
  children: React.ReactNode;
};

export async function AppShell({ children }: Props) {
  const locale = await getLocale();
  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      <a className="skip-link" href="#main">
        {messages.skip}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </I18nProvider>
  );
}
