"use client";

import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/locale";
import styles from "./SiteHeader.module.css";

export function LanguageSwitch() {
  const { locale, m, setLocale } = useI18n();

  function choose(next: Locale) {
    if (next === locale) return;
    setLocale(next);
  }

  return (
    <div className={styles.lang} role="group" aria-label={m.nav.language}>
      <button type="button" aria-pressed={locale === "es"} onClick={() => choose("es")}>
        <span aria-hidden="true">ES</span>
        <span className="sr-only">Español</span>
      </button>
      <button type="button" aria-pressed={locale === "en"} onClick={() => choose("en")}>
        <span aria-hidden="true">EN</span>
        <span className="sr-only">English</span>
      </button>
    </div>
  );
}
