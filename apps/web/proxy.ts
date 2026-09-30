import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSiteLocale, negotiateLocale } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const requestedLocale = request.nextUrl.searchParams.get("lang") ?? undefined;
  if (isSiteLocale(requestedLocale)) {
    const destination = requestedLocale === "en" ? "/" : `/${requestedLocale}`;
    const response = NextResponse.redirect(new URL(destination, request.url));
    response.cookies.set("pallas-locale", requestedLocale, {
      path: "/",
      maxAge: 31_536_000,
      sameSite: "lax",
    });
    return response;
  }

  const savedLocale = request.cookies.get("pallas-locale")?.value;
  const locale = isSiteLocale(savedLocale)
    ? savedLocale
    : negotiateLocale(request.headers.get("accept-language"));

  if (locale === "en") return NextResponse.next();

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ["/"],
};
