"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMessages } from "./get-messages";
import { es } from "./es";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./locale";
import type { Messages } from "./types";

type Value = {
  locale: Locale;
  m: Messages;
  setLocale: (next: Locale) => void;
};

const I18nContext = createContext<Value>({
  locale: DEFAULT_LOCALE,
  m: es,
  setLocale: () => {},
});

function readStoredLocale(): Locale | null {
  const stored = localStorage.getItem(LOCALE_COOKIE);
  if (isLocale(stored)) return stored;
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`))
    ?.split("=")[1];
  return isLocale(cookie) ? cookie : null;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    // The static HTML is Spanish. Read the saved language only after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only preference, must not change the first render
    if (stored && stored !== DEFAULT_LOCALE) setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(LOCALE_COOKIE, next);
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
  }

  return (
    <I18nContext.Provider value={{ locale, m: getMessages(locale), setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
