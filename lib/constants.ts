/** Cookie names used for httpOnly JWT tokens. */
export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

/** The HMIS backend base URL (server-side only — never exposed to the client). */
export const API_BASE = process.env.API_BASE ?? "http://localhost:8000";