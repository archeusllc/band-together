# CLAUDE.md

## Project Overview

**Band Together** — A band companion app for musicians to coordinate rehearsals, create/share setlists, and manage gigs.

## Tech Stack

- **Client:** Expo 54, React Native, TypeScript, NativeWind (Tailwind), Bun
- **API:** Bun, Elysia, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **Services:** Firebase (Auth, Storage, Cloud Messaging)
- **Dev Environment:** Docker (local Postgres + API)
- **Deploy Target:** Railway or Fly.io

## Repo Structure

Git submodules:

```
band-together/
├── client/    → archeusllc/bt-client (Expo app)
├── api/       → archeusllc/bt-api (Bun/Elysia)
└── db/        → archeusllc/bt-db (Prisma schema)
```

## Current Phase

**MVP (Phase 1):** Band-only tools
- Setlist CRUD
- Rehearsal scheduling
- Gig calendar
- Band membership

## Future Phases

- **Phase 2:** Local show discovery (fan-facing, event listings)
- **Phase 3:** Booking marketplace (artist/venue matching, payments)

## User Types

| User | Description |
|------|-------------|
| Artist/Band | Musicians coordinating rehearsals, setlists, gigs |
| Venue | Businesses booking acts (Phase 3) |
| Fan | Music lovers discovering live music (Phase 2) |

## Core Action

*Create and share a setlist for an upcoming gig.*

## Documentation

Full docs in the [Wiki](https://github.com/archeusllc/band-together/wiki).

## Key Decisions

- Submodules over monorepo (swappable prototypes)
- Firebase for auth + notifications + storage (already needed for push)
- Local Docker for dev, deploy when prototype stabilizes
