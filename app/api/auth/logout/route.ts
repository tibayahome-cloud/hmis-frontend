import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

export async function POST() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.has(ACCESS_TOKEN_COOKIE);
  const hasRefresh = cookieStore.has(REFRESH_TOKEN_COOKIE);

  if (!hasAccess && !hasRefresh) {
    return new NextResponse(null, { status: 204 });
  }

  const clearAccess = `${ACCESS_TOKEN_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
  const clearRefresh = `${REFRESH_TOKEN_COOKIE}=; HttpOnly; Path=/api/auth; SameSite=Lax; Max-Age=0`;

  return new NextResponse(null, {
    status: 204,
    headers: { "Set-Cookie": [clearAccess, clearRefresh].join(", ") },
  });
}