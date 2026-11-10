"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { readConsent, writeConsent } from "@/lib/consent/storage";
import styles from "./CookieBanner.module.css";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("paise-consent", onStoreChange);
  window.addEventListener("paise-open-cookies", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("paise-consent", onStoreChange);
    window.removeEventListener("paise-open-cookies", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  if (sessionStorage.getItem("paise-cookie-force-open") === "1") return true;
  return !readConsent().decidedAt;
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const { m } = useI18n();

  useEffect(() => {
    document.documentElement.classList.toggle("cookie-open", visible);
    return () => document.documentElement.classList.remove("cookie-open");
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label={m.cookie.title}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>{m.cookie.title}</strong>
          <p>{m.cookie.body}</p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              sessionStorage.removeItem("paise-cookie-force-open");
              writeConsent(false);
            }}
          >
            {m.cookie.reject}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              sessionStorage.removeItem("paise-cookie-force-open");
              writeConsent(true);
            }}
          >
            {m.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookiePrefsButton() {
  const { m } = useI18n();
  return (
    <button
      type="button"
      onClick={() => {
        sessionStorage.setItem("paise-cookie-force-open", "1");
        window.dispatchEvent(new Event("paise-open-cookies"));
      }}
    >
      {m.cookie.manage}
    </button>
  );
}
