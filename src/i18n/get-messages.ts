import { en } from "./en";
import { es } from "./es";
import type { Locale } from "./locale";
import type { Messages } from "./types";

export function getMessages(locale: Locale): Messages {
  return locale === "en" ? en : es;
}
