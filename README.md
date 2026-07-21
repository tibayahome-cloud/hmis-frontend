# Tiba HMIS Frontend

Next.js 14 frontend for the Tiba Hospital Management Information System. It proxies all
authenticated API calls through server-side Next.js route handlers, keeping JWT tokens out
of the browser entirely.

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Authentication Architecture](#authentication-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally (Native)](#running-locally-native)
  - [Running with Docker](#running-with-docker)
- [Available Routes](#available-routes)
- [Navigation and Pages](#navigation-and-pages)
- [Security Notes](#security-notes)
- [DevContainer](#devcontainer)
- [Development Notes](#development-notes)

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS (custom design system, no utility framework) |
| Auth | HttpOnly cookie-based JWT, managed by Next.js server route handlers |
| Backend | Flask REST API at `tyh-api/` (served on port 8000) |
| Container | Docker with multi-stage build, DevContainer for VS Code |

---

## Project Structure

```
hmis-frontend/
  app/
    (auth)/
      login/              Login page
    (dashboard)/
      page.tsx            Main dashboard
      patients/           Patient registry, new patient, triage, sick leave, death register
      visits/             Visit log, new visit
      ai-help/            AI-assisted clinical tools
    api/
      auth/
        login/            POST  - Forwards credentials to backend, sets HttpOnly cookies
        logout/           POST  - Calls backend to invalidate token, then clears cookies
        refresh/          POST  - Exchanges refresh token for a new access token
        me/               GET   - Returns the logged-in staff profile
      proxy/
        [...path]/        ALL   - Authenticated reverse proxy to /api/v1/* on the backend
  components/             Shared UI components (AppShell, Sidebar, Topbar, etc.)
  lib/
    auth-context.tsx      React context for login, logout, and user state
    api.ts                Thin client stub for backend data endpoints
    constants.ts          Cookie names and backend URL constant
    types.ts              TypeScript types mirroring the backend schema
    mock-data.ts          Static fixture data (used until backend endpoints are wired)
  middleware.ts           Edge middleware - redirects unauthenticated requests to /login
  .devcontainer/          VS Code DevContainer configuration
  Dockerfile              Production multi-stage Docker image
  Dockerfile.dev          Development Docker image
  docker-compose.yml      Frontend-only compose (dev and prod profiles)
```

---

## Authentication Architecture

All authentication is handled server-side. The browser never sees raw JWT tokens.

```
Browser                Next.js Server              Backend (Flask)
  |                         |                            |
  |-- POST /api/auth/login ->|                            |
  |                         |-- POST /api/v1/auth/login ->|
  |                         |<- { access_token, refresh_token } -|
  |<- Set-Cookie (HttpOnly) -|                            |
  |                         |                            |
  |-- GET /api/auth/me ----->|                            |
  |                         |-- GET /api/v1/staff/me ---->|
  |                         |   (Bearer access_token)    |
  |<- { user profile } -----|                            |
  |                         |                            |
  |-- POST /api/auth/logout->|                            |
  |                         |-- POST /api/v1/auth/logout->|
  |                         |   (invalidates refresh token on server)
  |<- 204, cookies cleared --|                            |
```

**Token storage**

| Token | Cookie name | Cookie path | Lifetime |
|---|---|---|---|
| Access token | `access_token` | `/` | 30 minutes |
| Refresh token | `refresh_token` | `/api/auth` | 7 days |

Both cookies are `HttpOnly`, so JavaScript cannot read them. The `SameSite=Lax` attribute
provides CSRF protection. In production (`NODE_ENV=production`) the `Secure` flag is added
so tokens are only transmitted over HTTPS.

**Transparent refresh**

The `/api/auth/me` route handler and the generic proxy at `/api/proxy/[...path]` both
silently refresh the access token when a 401 is received from the backend. The new token
is written back as a cookie in the same response, so the user session continues without
interruption.

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- The Tiba HMIS backend (`tyh-api/`) running on port 8000

### Environment Variables

Copy the example file and edit it:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
# Server-side only. Never sent to the browser.
# Running natively:   http://localhost:8000
# Running in Docker:  http://host.docker.internal:8000
API_BASE=http://localhost:8000
```

### Running Locally (Native)

Requires both the Next.js dev server and the backend to be running on the same machine.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The backend is expected at http://localhost:8000.

### Running with Docker

`docker-compose.yml` manages the frontend only. The backend is a separate service and
manages its own compose.

Set `API_BASE` to the address of the running backend before starting. On Docker Desktop
(Mac and Windows) `host.docker.internal` resolves to the host machine automatically.
On Linux, use the host IP or add `extra_hosts: ["host.docker.internal:host-gateway"]`
to the service in `docker-compose.yml`.

**Development server (hot reload):**

```bash
export API_BASE=http://host.docker.internal:8000
docker compose up
```

Source files are mounted as a volume so changes are reflected immediately without
rebuilding the image. The dev server starts on http://localhost:3000.

**Production build:**

```bash
export API_BASE=http://host.docker.internal:8000
docker compose --profile prod up --build
```

The production image uses the multi-stage `Dockerfile` and runs the Next.js standalone
server. `API_BASE` is baked in as a build argument and also injected at runtime.

---

## Available Routes

### API Route Handlers (server-side, not visible to the browser)

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate, receive HttpOnly cookies |
| POST | `/api/auth/logout` | Invalidate server token, clear cookies |
| POST | `/api/auth/refresh` | Exchange refresh token for new access token |
| GET | `/api/auth/me` | Return the current user's staff profile |
| ALL | `/api/proxy/*` | Authenticated reverse proxy to backend `/api/v1/*` |

### Page Routes

| Path | Description |
|---|---|
| `/login` | Login page (public) |
| `/` | Dashboard overview |
| `/patients` | Patient registry |
| `/patients/new` | Register a new patient |
| `/patients/triage` | Triage acuity board |
| `/patients/sick-leave` | Issue and track medical leave certificates |
| `/patients/death-register` | Statutory record of in-facility deaths |
| `/visits` | Visit log |
| `/visits/new` | Open a new encounter |
| `/ai-help` | AI-assisted patient overview and treatment planning |

---

## Navigation and Pages

Navigation is defined in `lib/nav.tsx` and rendered by `components/Sidebar.tsx`. Each
dashboard page is wrapped in `AppShell` (sidebar + topbar) via the `(dashboard)` layout.

Authentication is enforced at two levels:

1. **Middleware** (`middleware.ts`) — runs on the edge before any page renders. Redirects
   unauthenticated requests to `/login?redirect=<original-path>`.
2. **AuthGate** (`components/AuthGate.tsx`) — client-side guard that shows a loading
   state while the session is hydrated from `/api/auth/me`, then redirects to `/login` if
   no user is found.

---

## Security Notes

| Property | Implementation |
|---|---|
| Tokens in HttpOnly cookies | JS cannot read tokens; XSS cannot steal them |
| Refresh token path-scoped to `/api/auth` | The refresh token is only sent to auth routes, not to every API call |
| `SameSite=Lax` | Prevents the cookies from being sent on cross-site requests (CSRF mitigation) |
| `Secure` flag in production | Tokens only transmitted over HTTPS when `NODE_ENV=production` |
| `API_BASE` server-side only | The backend URL is never included in the client bundle |
| Backend token invalidation on logout | Calls `POST /api/v1/auth/logout` to blocklist the refresh token before clearing cookies |
| Edge middleware route guard | All dashboard routes are protected before any server component renders |

**Remaining considerations for hardening before production:**

- Add rate limiting to `/api/auth/login` to prevent brute-force attacks (handle at the
  nginx or load balancer level, or with an edge middleware rate limiter).
- Set `Content-Security-Policy`, `X-Frame-Options`, and `X-Content-Type-Options` headers
  in `next.config.mjs` under `headers()`.
- Use short access token lifetimes (the current 30 minutes is reasonable) and confirm
  the backend's refresh token rotation policy.

---

## DevContainer

A VS Code DevContainer is configured at `.devcontainer/devcontainer.json`. It uses the
official `javascript-node:20` image, installs project dependencies on container creation,
and forwards port 3000.

To use it:

1. Install the VS Code Dev Containers extension.
2. Open this repository in VS Code.
3. When prompted, select "Reopen in Container" (or run the command from the command palette).
4. Set `API_BASE` in `.env.local` to `http://host.docker.internal:8000` so the container
   can reach the backend running on the host.

---

## Development Notes

**Wiring mock data to real endpoints**

Pages currently import from `lib/mock-data.ts`. To connect a page to the backend, add a
function to `lib/api.ts` that calls `/api/proxy/<path>` and replace the mock import with
that function. The proxy automatically attaches the access token and handles refresh.

Example:

```ts
// lib/api.ts
export const api = {
  patients: () => get<Patient[]>("/api/proxy/patients"),
  visits:   () => get<Visit[]>("/api/proxy/visits"),
};
```

**Adding a new page**

1. Create the page file under `app/(dashboard)/your-route/page.tsx`.
2. Add a navigation entry in `lib/nav.tsx`.
3. The page is automatically protected by middleware and wrapped in the app shell.

**TypeScript**

```bash
npx tsc --noEmit
```

No custom TypeScript configuration is needed beyond `tsconfig.json`.

**Git**

`.env.local`, `.env`, and all `*.env*` files are excluded from version control via
`.gitignore`. Never commit secrets.
