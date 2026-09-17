import Link from "next/link";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { en } from "@/i18n/en";
import { CookiePrefsButton } from "./CookieBanner";
import styles from "./SiteFooter.module.css";

const legal = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/impressum", label: "Impressum" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{site.brand}</p>
          <p className={styles.tag}>{site.tagline}</p>
        </div>
        <div>
          <h2 className={styles.heading}>{en.footer.sitemap}</h2>
          <ul className={styles.list}>
            {navigation.map((g) => (
              <li key={g.id}>
                <Link href={g.href ?? g.children?.[0]?.href ?? "/"}>
                  {g.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/assessment">AI Maturity Assessment</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{en.footer.legal}</h2>
          <ul className={styles.list}>
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <CookiePrefsButton />
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.copy}`}>
        <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}
