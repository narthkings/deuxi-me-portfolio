"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeCookie,
  localizedPath,
  stripLocale,
  type Locale,
} from "@/lib/i18n/routing";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

function setLocaleCookie(next: Locale) {
  document.cookie = `${localeCookie}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const path = stripLocale(pathname);

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1 text-sm font-medium"
    >
      {(["en", "fr"] as const).map((item, index) => {
        const active = item === locale;
        const href = localizedPath(item, path);
        return (
          <span key={item} className="flex items-center gap-1">
            {index > 0 ? (
              <span aria-hidden className="text-muted/50">
                |
              </span>
            ) : null}
            <Link
              href={href}
              hrefLang={item}
              aria-current={active ? "true" : undefined}
              onClick={() => setLocaleCookie(item)}
              className={
                active
                  ? "text-ink no-underline"
                  : "text-muted no-underline transition-colors hover:text-ink"
              }
            >
              {item.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
