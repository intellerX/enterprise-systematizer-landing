"use client";

import { useSyncExternalStore } from "react";
import { en } from "@/i18n/en";
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

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label={en.cookie.title}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>{en.cookie.title}</strong>
          <p>{en.cookie.body}</p>
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
            {en.cookie.reject}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              sessionStorage.removeItem("paise-cookie-force-open");
              writeConsent(true);
            }}
          >
            {en.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookiePrefsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        sessionStorage.setItem("paise-cookie-force-open", "1");
        window.dispatchEvent(new Event("paise-open-cookies"));
      }}
    >
      {en.cookie.manage}
    </button>
  );
}
