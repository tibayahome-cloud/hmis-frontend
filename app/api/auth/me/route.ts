import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";
import type { StaffRead } from "@/lib/types";

const isProduction = process.env.NODE_ENV === "production";

async function fetchStaffMe(token: string): Promise<Response> {
  return fetch(`${API_BASE}/staff/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    // Disable Next.js caching — user profile must always be fresh
    cache: "no-store",
  });
}

async function tryRefresh(refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  let res = await fetchStaffMe(accessToken);
  let refreshedToken: string | null = null;

  // Transparent refresh: if the access token expired, silently obtain a new one
  if (res.status === 401 && refreshToken) {
    refreshedToken = await tryRefresh(refreshToken);
    if (refreshedToken) {
      accessToken = refreshedToken;
      res = await fetchStaffMe(accessToken);
    }
  }

  if (!res.ok) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const user = (await res.json()) as StaffRead;
  const response = NextResponse.json(user);

  // Persist the newly issued access token so subsequent requests don't re-trigger a refresh
  if (refreshedToken) {
    response.cookies.set({
      name: ACCESS_TOKEN_COOKIE,
      value: refreshedToken,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 30,
      secure: isProduction,
    });
  }

  return response;
}