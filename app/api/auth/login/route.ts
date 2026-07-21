import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { LoginRequest, TokenPair, ApiError } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest;

  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = (await res.json()) as ApiError;
    return NextResponse.json({ detail: err.detail || "Login failed" }, { status: res.status });
  }

  const tokens = (await res.json()) as TokenPair;
  const accessCookie = `${ACCESS_TOKEN_COOKIE}=${tokens.access_token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 30}`;
  const refreshCookie = `${REFRESH_TOKEN_COOKIE}=${tokens.refresh_token}; HttpOnly; Path=/api/auth; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;

  return NextResponse.json(
    { token_type: tokens.token_type },
    {
      headers: {
        "Set-Cookie": [accessCookie, refreshCookie].join(", "),
      },
    },
  );
}