"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocialLinks } from "@/components/social-links";
import {
  localizedPath,
  stripLocale,
  type Locale,
} from "@/lib/i18n/routing";
import type { Messages } from "@/lib/i18n/types";
import { navItems, site } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const pathname = usePathname();
  const currentPath = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link
          href={localizedPath(locale, "/")}
          className="group flex items-center gap-2 no-underline"
          onClick={closeMenu}
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-mono text-xs font-semibold text-bg transition-transform duration-200 group-hover:scale-105"
          >
            {"</>"}
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm font-medium md:flex"
        >
          {navItems.map((item) => {
            const href = localizedPath(locale, item.href);
            const active =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={href}
                data-active={active ? "true" : "false"}
                className={
                  active
                    ? "nav-link text-ink"
                    : "nav-link text-muted hover:text-ink"
                }
              >
                {messages.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher
            locale={locale}
            label={messages.chrome.language}
          />
          <SocialLinks className="flex items-center gap-3" />
        </div>

        <button
          type="button"
          className="btn-ghost inline-flex items-center border border-border bg-surface px-4 py-2 text-sm font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? messages.chrome.close : messages.chrome.menu}
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="animate-slide-down border-t border-border bg-surface/95 px-6 py-6 backdrop-blur-sm md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {navItems.map((item, index) => {
              const href = localizedPath(locale, item.href);
              const active =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={closeMenu}
                  className={
                    active
                      ? "animate-fade-up text-2xl font-semibold text-ink"
                      : "animate-fade-up text-2xl font-semibold text-ink no-underline transition-colors hover:text-accent"
                  }
                  style={{ ["--delay" as string]: `${index * 50}ms` }}
                >
                  {messages.nav[item.key]}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6">
            <LanguageSwitcher
              locale={locale}
              label={messages.chrome.language}
            />
          </div>
          <SocialLinks
            className="mt-8 flex flex-wrap gap-4 border-t border-border pt-6"
            iconClassName="h-6 w-6"
            onNavigate={closeMenu}
          />
        </div>
      ) : null}
    </header>
  );
}
