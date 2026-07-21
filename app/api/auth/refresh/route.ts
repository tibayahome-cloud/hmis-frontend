import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { AccessToken, ApiError } from "@/lib/types";

const isProduction = process.env.NODE_ENV === "production";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 });
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch {
    return NextResponse.json({ detail: "Could not reach authentication server" }, { status: 503 });
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => ({ detail: "Token refresh failed" }))) as ApiError;
    return NextResponse.json({ detail: err.detail || "Token refresh failed" }, { status: res.status });
  }

  const data = (await res.json()) as AccessToken;
  const response = NextResponse.json({ token_type: data.token_type });

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: data.access_token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 30, // 30 minutes
    secure: isProduction,
  });

  return response;
}