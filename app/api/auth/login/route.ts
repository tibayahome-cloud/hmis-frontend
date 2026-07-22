import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { LoginRequest, TokenPair, ApiError } from "@/lib/types";

const isProduction = process.env.NODE_ENV === "production";

export async function POST(request: Request) {
  let body: LoginRequest;
  try {
    body = (await request.json()) as LoginRequest;
  } catch {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { detail: "Could not reach the authentication server. Please try again." },
      { status: 503 },
    );
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => ({ detail: "Login failed" }))) as ApiError;
    return NextResponse.json({ detail: err.detail || "Login failed" }, { status: res.status });
  }

  const tokens = (await res.json()) as TokenPair;

  const response = NextResponse.json({ token_type: tokens.token_type });

  // Access token — short-lived, accessible on all routes
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: tokens.access_token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 30, // 30 minutes
    secure: isProduction,
  });

  // Refresh token — long-lived, scoped to /auth only to minimise exposure
  response.cookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: tokens.refresh_token,
    httpOnly: true,
    path: "/auth",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: isProduction,
  });

  return response;
}