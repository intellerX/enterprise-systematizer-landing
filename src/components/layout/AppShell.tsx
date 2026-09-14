import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { CookieBanner } from "./CookieBanner";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}
