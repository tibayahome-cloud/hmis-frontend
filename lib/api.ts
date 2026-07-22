// API client for the HMIS backend.
// All requests go through the Next.js API proxy at /api/proxy/*
// which handles authentication (cookies) and automatic token refresh.
//
// The proxy forwards to the backend at API_BASE/api/v1/*

import type { StaffRead, RoleRead, LoginRequest, TokenPair } from "@/lib/types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface HospitalRead {
  id: string;
  name: string;
  code: string;
  address: string | null;
  phone: string | null;
  is_active: boolean;
}

export interface HospitalCreate {
  name: string;
  code: string;
  address: string | null;
  phone: string | null;
  admin_full_name: string;
  admin_email: string;
  admin_password: string;
}

export interface HospitalWithAdminRead {
  hospital: HospitalRead;
  admin: StaffRead;
}

export interface StaffCreate {
  full_name: string;
  email: string;
  phone: string | null;
  password: string;
  role_id: string;
}

export interface ApiError {
  detail: string;
}

export interface Page<T> {
  items: T[];
  next_cursor: string | null;
  prev_cursor: string | null;
  has_more: boolean;
}

// ── HTTP helpers ─────────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`/api/proxy${path}`, options);
  if (!res.ok) {
    const err = (await res.json().catch(() => ({ detail: "Request failed" }))) as ApiError;
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Paginated requests ───────────────────────────────────────────────────────

async function paginatedRequest<T>(
  path: string,
  params?: { cursor?: string; limit?: number }
): Promise<Page<T>> {
  const sp = new URLSearchParams();
  if (params?.cursor) sp.set("cursor", params.cursor);
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  const res = await request<any>("GET", `${path}?${qs}`);
  if (Array.isArray(res)) {
    return {
      items: res,
      next_cursor: null,
      prev_cursor: null,
      has_more: false,
    };
  }
  return res;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
  login: (credentials: LoginRequest): Promise<TokenPair> =>
    request<TokenPair>("POST", "/auth/login", credentials),
};

// ── Hospitals (super_admin only) ─────────────────────────────────────────────

export const hospitals = {
  list: (params?: { cursor?: string; limit?: number }): Promise<Page<HospitalRead>> =>
    paginatedRequest<HospitalRead>("/hospitals", params),

  get: (id: string): Promise<HospitalRead> =>
    request<HospitalRead>("GET", `/hospitals/${id}`),

  create: (data: HospitalCreate): Promise<HospitalWithAdminRead> =>
    request<HospitalWithAdminRead>("POST", "/hospitals", data),
};

// ── Staff (admin+) ───────────────────────────────────────────────────────────

export const staff = {
  list: (params?: { cursor?: string; limit?: number }): Promise<Page<StaffRead>> =>
    paginatedRequest<StaffRead>("/staff", params),

  get: (id: string): Promise<StaffRead> =>
    request<StaffRead>("GET", `/staff/${id}`),

  me: (): Promise<StaffRead> =>
    request<StaffRead>("GET", "/staff/me"),

  create: (data: StaffCreate): Promise<StaffRead> =>
    request<StaffRead>("POST", "/staff", data),

  roles: (): Promise<RoleRead[]> =>
    request<RoleRead[]>("GET", "/staff/roles/list"),
};

// ── Legacy stub (kept for compatibility) ─────────────────────────────────────

export const api = {
  // Use the typed functions above instead
};
