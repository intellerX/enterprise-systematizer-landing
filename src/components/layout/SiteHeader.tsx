"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { en } from "@/i18n/en";
import { track } from "@/lib/analytics/track";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveGroup(null);
      }
    }
    function onPointerDown(e: MouseEvent) {
      if (!headerRef.current?.contains(e.target as Node)) {
        setActiveGroup(null);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={`container ${styles.bar}`}>
        <Link className={styles.brand} href="/" onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandText}>{site.brand}</span>
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? en.nav.closeMenu : en.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
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
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {navigation.map((group) => {
              const hasChildren = !!group.children?.length;
              const expanded = activeGroup === group.id;
              return (
                <li
                  key={group.id}
                  className={styles.navItem}
                  onMouseEnter={() => {
                    if (hasChildren && window.matchMedia("(min-width: 1024px)").matches) {
                      setActiveGroup(group.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(min-width: 1024px)").matches) {
                      setActiveGroup(null);
                    }
                  }}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={styles.navButton}
                        aria-expanded={expanded}
                        aria-controls={`${group.id}-panel`}
                        onClick={() =>
                          setActiveGroup((cur) =>
                            cur === group.id ? null : group.id,
                          )
                        }
                        onFocus={() => {
                          if (window.matchMedia("(min-width: 1024px)").matches) {
                            setActiveGroup(group.id);
                          }
                        }}
                      >
                        {group.label}
                        <span className={styles.chevron} aria-hidden />
                      </button>
                      <div
                        id={`${group.id}-panel`}
                        className={`${styles.panel} ${expanded ? styles.panelOpen : ""}`}
                        hidden={!expanded}
                      >
                        <ul className={styles.panelList}>
                          {group.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={styles.panelLink}
                                onClick={() => {
                                  setOpen(false);
                                  setActiveGroup(null);
                                }}
                              >
                                <span>{child.label}</span>
                                {child.description ? (
                                  <small>{child.description}</small>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={group.href ?? "/"}
                      className={styles.navLink}
                      onClick={() => setOpen(false)}
                    >
                      {group.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            className={`btn btn--primary ${styles.cta}`}
            onClick={() => {
              track("cta_click", { id: "header_contact" });
              setOpen(false);
            }}
          >
            {en.nav.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
