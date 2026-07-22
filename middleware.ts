import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { ROUTE_ROLES } from "@/lib/role-routes";
import { jwtVerify } from "jose";

const AUTH_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "change-me-in-prod"
);

/** Paths that do not require authentication. */
const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/me",
  "/api/auth/refresh",
  "/api/auth/logout",
];

/** Static assets and Next.js internals — never block these. */
const EXCLUDED_PREFIXES = ["/_next/", "/favicon", "/globals.css"];

type JwtPayload = {
  sub?: string;
  type?: string;
  role?: string;
  iat?: number;
  exp?: number;
};

async function getRoleFromToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, AUTH_SECRET);
    return payload.role ?? null;
  } catch {
    return null;
  }
}

function isPathAllowed(pathname: string, role: string): boolean {
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

  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();
  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the backend later includes a role claim, enforce route access here.
  // For now we only rely on backend require_roles() plus client-side guards.
  const role = await getRoleFromToken(accessToken);
  if (role) {
    const pathRole = Object.keys(ROUTE_ROLES).find((routePrefix) =>
      pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)
    );

    if (pathRole && !isPathAllowed(pathname, role)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|globals.css).*)",
  ],
};
