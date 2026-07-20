# Tiba HMIS — frontend

Independent Next.js (App Router, TypeScript) frontend for Tiba HMIS. It replaces the
server-rendered Jinja templates in the `hmis` Flask app with a standalone SPA that talks
to the backend over JSON.

## What this is

A boilerplate. It ports the existing admin template (Mazer-style) into Next.js so the
migration off Flask/Jinja has a starting point. Pages render mock data from
`lib/mock-data.ts` because the Flask backend has no data layer wired in yet.

## Routes mirrored from the Flask app

- `/` — dashboard
- `/patients` — patient list
- `/patients/new` — new patient
- `/patients/triage` — triage
- `/patients/sick-leave` — sick leave
- `/patients/death-register` — death register
- `/visits` — visit queue / list
- `/visits/new` — new visit
- `/ai-help` — AI patient overview, image analysis, treatment plan

## Stack

- Next.js 15, React 19, TypeScript
- `motion` for animations
- Plain CSS (port of the existing `app.css` design tokens), no UI framework

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Talking to the backend

Set the API base and point `lib/api.ts` at real endpoints:

```bash
cp .env.example .env.local
# edit NEXT_PUBLIC_API_BASE
```

The page components already consume the same shapes `lib/api.ts` will return, so swapping
mock data for `fetch` is a drop-in change.

## Project structure

```
app/              # routes (one folder per page)
components/        # Sidebar, Topbar, StatCard, AcuityBadge, etc.
lib/              # nav config, mock data, api client stub
```

## Branch note

Built on `frontend/boilerplate`, not `main`. Open a PR to merge.
