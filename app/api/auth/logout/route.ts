import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

const isProduction = process.env.NODE_ENV === "production";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  // Tell the backend to invalidate / blocklist the refresh token server-side.
  // We do this before clearing cookies so the token is unusable even if captured.
  if (refreshToken) {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    } catch {
      // Never block the user from logging out if the backend is temporarily unreachable.
      // The cookies will still be cleared on the client side.
    }
  }

  const response = new NextResponse(null, { status: 204 });

  // Expire both cookies immediately
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
    secure: isProduction,
  });

  response.cookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    path: "/auth",
    sameSite: "lax",
    maxAge: 0,
    secure: isProduction,
  });

  return response;
}