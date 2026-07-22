import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";

/** Paths that do not require authentication. */
const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/logout",
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

  // TEMPORARY: Role-based access control is disabled during development.
  // The backend's require_roles() RBAC will enforce permissions when
  // the relevant API routes are implemented. For now, any authenticated
  // user can access all dashboard pages for layout testing.
  //
  // When ready to enable, uncomment the following block and ensure
  // the backend routes are implemented:
  //
  // import { ROUTE_ROLES } from "@/lib/role-routes";
  // const pathRole = Object.keys(ROUTE_ROLES).find((rolePath) =>
  //   pathname.startsWith(rolePath)
  // );
  // if (pathRole) {
  //   // The role is embedded in the JWT token. We can't decode it here
  //   // without importing the JWT library, so we rely on the backend for
  //   // actual authorization. The frontend sidebar already filters nav items.
  //   // This is defense-in-depth — the backend will reject unauthorized requests.
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|globals.css).*)",
  ],
};