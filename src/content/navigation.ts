import type { Locale } from "@/i18n/locale";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
};

const es: NavGroup[] = [
  { id: "process", label: "Cómo trabajamos", href: "/#proceso" },
  { id: "benefits", label: "Beneficios", href: "/#beneficios" },
  { id: "cases", label: "Casos", href: "/#casos" },
  { id: "contact", label: "Contacto", href: "/#contacto" },
];

const en: NavGroup[] = [
  { id: "process", label: "How we work", href: "/#proceso" },
  { id: "benefits", label: "Benefits", href: "/#beneficios" },
  { id: "cases", label: "Sectors", href: "/#casos" },
  { id: "contact", label: "Contact", href: "/#contacto" },
];

export function getNavigation(locale: Locale): NavGroup[] {
  return locale === "en" ? en : es;
}
