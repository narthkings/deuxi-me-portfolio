import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projects`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
