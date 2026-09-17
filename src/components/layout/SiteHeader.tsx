"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { en } from "@/i18n/en";
import { track } from "@/lib/analytics/track";
import styles from "./SiteHeader.module.css";

function isDesktopNav() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setActiveGroup(null), 160);
  }

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
        setOpen(false);
      }
    }
    function onResize() {
      if (isDesktopNav()) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("resize", onResize);
      clearCloseTimer();
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
          onClick={(e) => {
            e.stopPropagation();
            setActiveGroup(null);
            setOpen((v) => !v);
          }}
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
                  className={`${styles.navItem} ${expanded ? styles.navItemOpen : ""}`}
                  onMouseEnter={() => {
                    if (!hasChildren || !isDesktopNav()) return;
                    clearCloseTimer();
                    setActiveGroup(group.id);
                  }}
                  onMouseLeave={() => {
                    if (!isDesktopNav()) return;
                    scheduleClose();
                  }}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={styles.navButton}
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        aria-controls={`${group.id}-panel`}
                        onClick={() => {
                          clearCloseTimer();
                          setActiveGroup((cur) =>
                            cur === group.id ? null : group.id,
                          );
                        }}
                        onFocus={() => {
                          if (isDesktopNav()) {
                            clearCloseTimer();
                            setActiveGroup(group.id);
                          }
                        }}
                      >
                        {group.label}
                        <span className={styles.chevron} aria-hidden />
                      </button>
                      <div
                        id={`${group.id}-panel`}
                        role="region"
                        aria-label={group.label}
                        className={`${styles.panel} ${expanded ? styles.panelOpen : ""}`}
                        hidden={!expanded}
                        onMouseEnter={() => {
                          if (isDesktopNav()) clearCloseTimer();
                        }}
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
              setActiveGroup(null);
            }}
          >
            {en.nav.contact}
          </Link>
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label={en.nav.closeMenu}
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
