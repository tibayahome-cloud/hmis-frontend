import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

const isProduction = process.env.NODE_ENV === "production";

async function tryRefreshToken(refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
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

async function proxyRequest(request: NextRequest, path: string[]) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  const backendUrl = `${API_BASE}/api/v1/${path.join("/")}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = searchParams ? `${backendUrl}?${searchParams}` : backendUrl;

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Forward content-type for mutating requests
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const fetchOptions: RequestInit = { method: request.method, headers };

  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      fetchOptions.body = await request.text();
    } catch {
      // no body needed
    }
  }

  let res = await fetch(url, fetchOptions);
  let refreshedToken: string | null = null;

  // Transparent auto-refresh: retry once with a fresh access token on 401
  if (res.status === 401 && refreshToken) {
    refreshedToken = await tryRefreshToken(refreshToken);
    if (refreshedToken) {
      headers["Authorization"] = `Bearer ${refreshedToken}`;
      res = await fetch(url, { ...fetchOptions, headers });
    }
  }

  // Build response — forward the backend content-type so JSON arrives correctly
  const resContentType = res.headers.get("content-type") ?? "";
  const body = resContentType.includes("application/json")
    ? JSON.stringify(await res.json())
    : await res.text();

  const response = new NextResponse(body, {
    status: res.status,
    headers: resContentType ? { "Content-Type": resContentType } : undefined,
  });

  // If a token refresh happened, write the new access token cookie
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxyRequest(request, path);
}