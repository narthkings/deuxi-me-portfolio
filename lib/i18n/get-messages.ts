import { en } from "@/lib/i18n/messages/en";
import { fr } from "@/lib/i18n/messages/fr";
import type { Locale } from "@/lib/i18n/routing";
import type { Messages } from "@/lib/i18n/types";

const catalog: Record<Locale, Messages> = { en, fr };

export function getMessages(locale: Locale): Messages {
  return catalog[locale] ?? catalog.en;
}
