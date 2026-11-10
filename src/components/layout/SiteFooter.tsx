import Link from "next/link";
import { getNavigation } from "@/content/navigation";
import { site } from "@/content/site";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";
import { CookiePrefsButton } from "./CookieBanner";
import styles from "./SiteFooter.module.css";

export async function SiteFooter() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const navigation = getNavigation(locale);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{site.brand}</p>
          <p className={styles.tag}>{m.footer.tagline}</p>
        </div>
        <div>
          <h2 className={styles.heading}>{m.footer.sitemap}</h2>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{m.footer.legal}</h2>
          <ul className={styles.list}>
            {m.footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <CookiePrefsButton />
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.copy}`}>
        <p>
          © {new Date().getFullYear()} {site.brand}. {m.footer.rights}
        </p>
      </div>
    </footer>
  );
}
