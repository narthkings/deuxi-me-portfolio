import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/i18n/metadata";
import { locales, localizedPath } from "@/lib/i18n/routing";

const paths = ["/", "/projects", "/resume", "/contact"] as const;

const priorities: Record<(typeof paths)[number], number> = {
  "/": 1,
  "/projects": 0.9,
  "/resume": 0.8,
  "/contact": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      changeFrequency: path === "/contact" ? "yearly" : "monthly",
      priority: priorities[path],
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [
            item,
            absoluteUrl(localizedPath(item, path)),
          ]),
        ),
      },
    })),
  );
}
