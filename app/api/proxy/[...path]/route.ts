import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

async function tryRefreshToken(): Promise<string | null> {
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

async function proxyRequest(request: NextRequest, path: string[]) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  const backendUrl = `${API_BASE}/api/v1/${path.join("/")}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = searchParams ? `${backendUrl}?${searchParams}` : backendUrl;

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Forward the content-type from the original request for mutating requests
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      fetchOptions.body = await request.text();
    } catch {
      // body not needed
    }
  }

  let res = await fetch(url, fetchOptions);

  // Auto-refresh on 401
  if (res.status === 401 && accessToken) {
    const newAccessToken = await tryRefreshToken();
    if (newAccessToken) {
      headers["Authorization"] = `Bearer ${newAccessToken}`;
      res = await fetch(url, { ...fetchOptions, headers });
      accessToken = newAccessToken;
    }
  }

  const responseHeaders: Record<string, string> = {};

  // If a new access token was issued, set it as a cookie
  if (accessToken && !cookieStore.get(ACCESS_TOKEN_COOKIE)?.value) {
    responseHeaders["Set-Cookie"] =
      `${ACCESS_TOKEN_COOKIE}=${accessToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 30}`;
  }

  // Forward the response body
  const body = res.headers.get("content-type")?.includes("application/json")
    ? JSON.stringify(await res.json())
    : await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: responseHeaders,
  });
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