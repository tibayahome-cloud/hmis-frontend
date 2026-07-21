import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { AccessToken, ApiError } from "@/lib/types";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    const err = (await res.json()) as ApiError;
    return NextResponse.json({ detail: err.detail || "Token refresh failed" }, { status: res.status });
  }

  const data = (await res.json()) as AccessToken;
  const accessCookie = `${ACCESS_TOKEN_COOKIE}=${data.access_token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 30}`;

  return NextResponse.json(
    { token_type: data.token_type },
    {
      headers: { "Set-Cookie": accessCookie },
    },
  );
}