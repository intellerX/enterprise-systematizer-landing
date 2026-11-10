"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { getNavigation } from "@/content/navigation";
import { site } from "@/content/site";
import { useI18n } from "@/i18n/I18nProvider";
import { track } from "@/lib/analytics/track";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { locale, m } = useI18n();
  const navigation = getNavigation(locale);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link className={styles.brand} href="/" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandText}>{site.brand}</span>
        </Link>

        <LanguageSwitch />

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? m.nav.closeMenu : m.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.menuIcon} aria-hidden>
            <span className={`${styles.menuBar} ${open ? styles.menuBarTop : ""}`} />
            <span className={`${styles.menuBar} ${open ? styles.menuBarMid : ""}`} />
            <span className={`${styles.menuBar} ${open ? styles.menuBarBot : ""}`} />
          </span>
        </button>

        <nav
          id={menuId}
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label={m.nav.primary}
        >
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contacto"
            className={`btn btn--primary ${styles.cta}`}
            onClick={() => {
              track("cta_click", { id: "header_contact" });
              setOpen(false);
            }}
          >
            {m.nav.contact}
          </Link>
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label={m.nav.closeMenu}
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
