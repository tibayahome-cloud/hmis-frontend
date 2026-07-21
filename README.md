# Tiba HMIS Frontend

Next.js 14 frontend for the Tiba Hospital Management Information System.

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [Routes](#routes)
- [Security](#security)
- [DevContainer](#devcontainer)
- [Development Notes](#development-notes)

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS |
| Auth | HttpOnly cookie-based JWT via Next.js server route handlers |
| Backend | Flask REST API on port 8000 |
| Runtime | Node.js 20 |

---

## Project Structure

```
hmis-frontend/
  app/
    (auth)/
      login/                  Login page
    (dashboard)/
      page.tsx                Dashboard overview
      patients/               Patient registry, triage, sick leave, death register
      visits/                 Visit log and new visit form
      ai-help/                AI-assisted clinical tools
    api/
      auth/
        login/                POST /api/auth/login
        logout/               POST /api/auth/logout
        refresh/              POST /api/auth/refresh
        me/                   GET  /api/auth/me
      proxy/
        [...path]/            Reverse proxy to /api/v1/* on the backend
  components/                 Shared UI components
  lib/
    auth-context.tsx          Auth state, login, and logout
    api.ts                    Backend client stub
    constants.ts              Cookie names and backend URL
    types.ts                  TypeScript types
    mock-data.ts              Static fixture data
  middleware.ts               Route protection
  .devcontainer/              VS Code DevContainer
  Dockerfile                  Production image
  Dockerfile.dev              Development image
  docker-compose.yml          Compose file
```

---

## Authentication

All token handling occurs server-side. The browser receives only cookies and never
has access to raw JWT values.

```
Browser                Next.js Server              Backend (Flask)
  |                         |                            |
  |-- POST /api/auth/login ->|                            |
  |                         |-- POST /api/v1/auth/login ->|
  |                         |<-- access_token, refresh_token --|
  |<-- Set-Cookie (HttpOnly)-|                            |
  |                         |                            |
  |-- GET /api/auth/me ----->|                            |
  |                         |-- GET /api/v1/staff/me ----->|
  |<-- { user profile } ----|                            |
  |                         |                            |
  |-- POST /api/auth/logout->|                            |
  |                         |-- POST /api/v1/auth/logout ->|
  |<-- 204, cookies cleared -|                            |
```

**Cookies**

| Token | Cookie | Path | Lifetime |
|---|---|---|---|
| Access token | `access_token` | `/` | 30 minutes |
| Refresh token | `refresh_token` | `/api/auth` | 7 days |

Both cookies are `HttpOnly` and `SameSite=Lax`. The `Secure` flag is set when
`NODE_ENV=production`.

When the backend returns 401, the `/api/auth/me` handler and the API proxy both
attempt a silent token refresh before returning an error to the client.

---

## Getting Started

### Prerequisites

- Node.js 20
- npm 10
- Backend API running on port 8000

### Environment Variables

```bash
cp .env.example .env.local
```

`.env.local`:

```
# Running natively:  http://localhost:8000
# Running in Docker: http://host.docker.internal:8000
API_BASE=http://localhost:8000
```

`API_BASE` is read server-side only and is never included in the client bundle.

### Running Locally

```bash
npm install
npm run dev
```

Application starts at http://localhost:3000.

### Running with Docker

**Development (source mounted, hot reload):**

```bash
export API_BASE=http://host.docker.internal:8000
docker compose up
```

**Production:**

```bash
export API_BASE=http://host.docker.internal:8000
docker compose --profile prod up --build
```

The production image uses `output: standalone` from `next.config.mjs` and runs as a
non-root user.

On Linux, `host.docker.internal` requires adding `extra_hosts: ["host.docker.internal:host-gateway"]`
to the service definition in `docker-compose.yml`.

---

## Routes

**Server-side route handlers**

| Method | Path | Action |
|---|---|---|
| POST | `/api/auth/login` | Forward credentials to backend, set cookies |
| POST | `/api/auth/logout` | Invalidate refresh token on backend, clear cookies |
| POST | `/api/auth/refresh` | Exchange refresh token for a new access token |
| GET | `/api/auth/me` | Return the current user profile |
| ALL | `/api/proxy/*` | Authenticated proxy to `/api/v1/*` on the backend |

**Pages**

| Path | Description |
|---|---|
| `/login` | Login (public) |
| `/` | Dashboard |
| `/patients` | Patient registry |
| `/patients/new` | New patient registration |
| `/patients/triage` | Triage acuity board |
| `/patients/sick-leave` | Medical leave certificates |
| `/patients/death-register` | In-facility death records |
| `/visits` | Visit log |
| `/visits/new` | New encounter |
| `/ai-help` | AI clinical tools |

---

## Security

| Property | Detail |
|---|---|
| HttpOnly cookies | Tokens are inaccessible to JavaScript |
| Refresh token path scope | Refresh token is sent only to `/api/auth` routes |
| SameSite=Lax | Cross-site request protection |
| Secure flag | Applied in production; tokens transmitted over HTTPS only |
| Server-side backend URL | `API_BASE` is absent from the client bundle |
| Server-side token invalidation | Logout calls the backend before clearing cookies |
| Edge middleware | All dashboard routes redirect to `/login` without a valid cookie |

**Pre-production hardening checklist:**

- Rate-limit `POST /api/auth/login` at the load balancer or nginx layer.
- Add `Content-Security-Policy`, `X-Frame-Options`, and `X-Content-Type-Options`
  response headers in `next.config.mjs`.
- Confirm the backend refresh token rotation and blocklist policy.

---

## DevContainer

Configuration is at `.devcontainer/devcontainer.json`.

- Image: `mcr.microsoft.com/devcontainers/javascript-node:20`
- Port 3000 forwarded automatically
- `npm install` runs on container creation
- VS Code extensions: ESLint, Prettier, Docker

Set `API_BASE=http://host.docker.internal:8000` in `.env.local` when using the
DevContainer.

---

## Development Notes

**Connecting pages to live backend data**

Pages import from `lib/mock-data.ts`. To wire a page to a real endpoint, add
the call to `lib/api.ts` and update the page import:

```ts
// lib/api.ts
export const api = {
  patients: () => get<Patient[]>("/api/proxy/patients"),
  visits:   () => get<Visit[]>("/api/proxy/visits"),
};
```

The proxy at `/api/proxy/*` attaches the access token automatically and handles
silent refresh.

**Adding a page**

1. Create `app/(dashboard)/your-route/page.tsx`.
2. Add the entry to `lib/nav.tsx`.

The page is automatically protected by middleware and rendered inside the app shell.

**Type checking**

```bash
npx tsc --noEmit
```
