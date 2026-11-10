"use client";

import { createContext, useContext } from "react";
import { es } from "./es";
import type { Locale } from "./locale";
import type { Messages } from "./types";

type Value = {
  locale: Locale;
  m: Messages;
};

const I18nContext = createContext<Value>({ locale: "es", m: es });

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, m: messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
