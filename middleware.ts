import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { ROUTE_ROLES } from "@/lib/role-routes";
import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "change-me-in-prod"
);

/** Paths that do not require authentication. */
const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/logout",
];

/** Static assets and Next.js internals — never block these. */
const EXCLUDED_PREFIXES = ["/_next/", "/favicon", "/globals.css"];

async function getRoleFromToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, AUTH_SECRET);
    const role = (payload as Record<string, unknown>)["role"] as string | undefined;
    return role ?? null;
  } catch {
    return null;
  }
}

async function isPathAllowed(pathname: string, role: string): Promise<boolean> {
  const allowedRoutes = Object.entries(ROUTE_ROLES).filter(([, roles]) =>
    roles.includes(role)
  );

  for (const [routePrefix] of allowedRoutes) {
    if (pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)) {
      return true;
    }
  }

  return false;
}

export async function middleware(request: NextRequest) {
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

  // Decode JWT and enforce role-based access control
  const role = await getRoleFromToken(accessToken);
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the path has role restrictions, check if the user's role is allowed
  const pathRole = Object.keys(ROUTE_ROLES).find((routePrefix) =>
    pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)
  );

  if (pathRole && !(await isPathAllowed(pathname, role))) {
    // User is authenticated but not authorized for this route
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|globals.css).*)",
  ],
};
