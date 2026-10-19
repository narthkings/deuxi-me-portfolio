export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Path without locale prefix, always starting with `/`. */
export function stripLocale(pathname: string): string {
  const cleaned = pathname.replace(/\/$/, "") || "/";
  for (const locale of locales) {
    if (cleaned === `/${locale}`) return "/";
    if (cleaned.startsWith(`/${locale}/`)) {
      const rest = cleaned.slice(locale.length + 1);
      return rest || "/";
    }
  }
  return cleaned;
}

/** Public URL for a path in a given locale (EN unprefixed). */
export function localizedPath(locale: Locale, path: string): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && isLocale(segment)) return segment;
  return defaultLocale;
}
