/** Backend-mirroring types for the Tiba HMIS frontend. */

// ── Auth ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AccessToken {
  access_token: string;
  token_type: string;
}

// ── Staff / Role ────────────────────────────────────────────────────────────

export interface RoleRead {
  id: string;
  name: string;
  description: string | null;
}

export interface StaffRead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  role: RoleRead;
  hospital_id: string | null;
}

// ── API error ───────────────────────────────────────────────────────────────

export interface ApiError {
  detail: string;
}