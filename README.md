# Notebook — Client

A private, Google Keep–style notebook app built with Next.js 16 (App Router), TypeScript,
and Tailwind CSS v4. It talks to the Express + Prisma + PostgreSQL backend in `../server`.

## Features

- Register / login (backend JWT stored in an httpOnly cookie via server actions)
- Google OAuth social login (Continue with Google → `/auth/callback` sets the session cookie)
- Create, edit, view, pin, and soft-delete notes
- Per-user labels (Google Keep–style): default labels plus create/delete your own; filter
  by label, search, sort, and pinned
- Admin panel: User Management (role change, ban/restore) + Note Management (view/delete any
  note in the system, searchable)

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Landing page (redirects to `/notes` when logged in) |
| `/login`, `/signup` | Auth |
| `/notes` | Notes grid |
| `/notes/new` | Create note |
| `/notes/[id]`, `/notes/[id]/edit` | View / edit note |
| `/admin` | Admin moderation (ADMIN role only) |

## Setup

```bash
cp .env.example .env   # set NEXT_PUBLIC_BASE_URL to the backend URL
npm install
npm run dev
```

## Scripts

```bash
npm run dev       # dev server
npm run build     # production build
npm run start     # production server
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

Auth is handled entirely by the backend (`POST /api/auth/login`, `POST /api/auth/register`).
There is no BetterAuth / no Google OAuth / no `ba_auth_*` tables in this client.