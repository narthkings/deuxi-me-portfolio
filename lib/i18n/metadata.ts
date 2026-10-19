import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n/get-messages";
import {
  defaultLocale,
  localizedPath,
  type Locale,
} from "@/lib/i18n/routing";
import { site } from "@/lib/site";

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path}`;
}

export function languageAlternates(path: string) {
  return {
    en: absoluteUrl(localizedPath("en", path)),
    fr: absoluteUrl(localizedPath("fr", path)),
    "x-default": absoluteUrl(localizedPath(defaultLocale, path)),
  };
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetaInput): Metadata {
  const messages = getMessages(locale);
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${messages.meta.title}`;
  const canonical = localizedPath(locale, path);
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const alternateLocale = locale === "fr" ? "en_US" : "fr_FR";

  return {
    title: title ?? undefined,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
