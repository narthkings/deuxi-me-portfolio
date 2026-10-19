import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  type Locale,
} from "@/lib/i18n/routing";

function prefersFrench(header: string | null): boolean {
  if (!header) return false;
  const parts = header.split(",").map((part) => {
    const [tag, ...params] = part.trim().split(";");
    const q = params
      .map((p) => p.trim())
      .find((p) => p.startsWith("q="));
    const quality = q ? Number(q.slice(2)) : 1;
    return {
      tag: tag.toLowerCase(),
      quality: Number.isFinite(quality) ? quality : 1,
    };
  });
  const fr = parts.find((p) => p.tag === "fr" || p.tag.startsWith("fr-"));
  const en = parts.find((p) => p.tag === "en" || p.tag.startsWith("en-"));
  if (!fr) return false;
  if (!en) return fr.quality > 0;
  return fr.quality > en.quality;
}

function withLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonicalize /en and /en/... to unprefixed English URLs
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/";
    const response = NextResponse.redirect(url);
    return withLocaleCookie(response, defaultLocale);
  }

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first) && first !== defaultLocale) {
    const response = NextResponse.next();
    return withLocaleCookie(response, first);
  }

  const cookieLocale = request.cookies.get(localeCookie)?.value;
  const hasCookie = cookieLocale && isLocale(cookieLocale);

  // First visit: soft preference for French on home only
  if (
    !hasCookie &&
    pathname === "/" &&
    prefersFrench(request.headers.get("accept-language"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/fr";
    const response = NextResponse.redirect(url);
    return withLocaleCookie(response, "fr");
  }

  // Default locale: rewrite internally to /en/...
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);
  return withLocaleCookie(response, defaultLocale);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
