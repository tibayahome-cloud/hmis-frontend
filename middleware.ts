import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";

/** Paths that do not require authentication. */
const PUBLIC_PATHS = [
  "/login",
  "//auth/login",
  "//auth/refresh",
  "//auth/logout",
];

/** Static assets and Next.js internals — never block these. */
const EXCLUDED_PREFIXES = ["/_next/", "/favicon", "/globals.css"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and static assets
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();
  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|globals.css).*)",
  ],
};