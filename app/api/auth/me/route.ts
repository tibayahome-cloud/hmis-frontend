import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { StaffRead } from "@/lib/types";

async function fetchStaffMe(token: string): Promise<Response> {
  return fetch(`${API_BASE}/api/v1/staff/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
}

async function tryRefresh(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function GET() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  let res = await fetchStaffMe(accessToken);

  // If access token is expired, try refreshing it
  if (res.status === 401) {
    const newToken = await tryRefresh();
    if (newToken) {
      accessToken = newToken;
      res = await fetchStaffMe(accessToken);
    }
  }

  if (!res.ok) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: res.status });
  }

  const user = (await res.json()) as StaffRead;

  // If a new access token was issued via refresh, update the cookie
  const currentCookie = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (accessToken && currentCookie !== accessToken) {
    return NextResponse.json(user, {
      headers: {
        "Set-Cookie": `${ACCESS_TOKEN_COOKIE}=${accessToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 30}`,
      },
    });
  }

  return NextResponse.json(user);
}