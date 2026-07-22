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

// ── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
  login: (credentials: LoginRequest): Promise<TokenPair> =>
    request<TokenPair>("POST", "/auth/login", credentials),
};

// ── Hospitals (super_admin only) ─────────────────────────────────────────────

export const hospitals = {
  list: (): Promise<HospitalRead[]> =>
    request<HospitalRead[]>("GET", "/hospitals"),

  get: (id: string): Promise<HospitalRead> =>
    request<HospitalRead>("GET", `/hospitals/${id}`),

  create: (data: HospitalCreate): Promise<HospitalWithAdminRead> =>
    request<HospitalWithAdminRead>("POST", "/hospitals", data),
};

// ── Staff (admin+) ───────────────────────────────────────────────────────────

export const staff = {
  list: (): Promise<StaffRead[]> =>
    request<StaffRead[]>("GET", "/staff"),

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
