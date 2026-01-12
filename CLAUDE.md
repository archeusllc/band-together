# CLAUDE.md

## Project Overview

**Band Together** — A band companion app for musicians to coordinate rehearsals, create/share setlists, and manage gigs.

## Tech Stack

- **Client:** Expo 54, React Native, TypeScript, NativeWind (Tailwind), Bun
- **API:** Bun, Elysia, TypeScript, Prisma 7
- **Database:** PostgreSQL 16, Prisma ORM 7 with PrismaPg adapter
- **DB Module:** Prisma schema with TypeScript client generation (`@band-together/db`)
- **Services:** Firebase (Auth, Storage, Cloud Messaging)
- **Dev Environment:** Docker Compose (PostgreSQL + Adminer)
- **Deploy Target:** Railway or Fly.io

## Repo Structure

Git submodules:

```
band-together/
├── client/    → archeusllc/bt-client (Expo app)
├── api/       → archeusllc/bt-api (Bun/Elysia)
├── db/        → archeusllc/bt-db (Prisma schema)
└── shared/    → archeusllc/bt-shared (Shared types + Prisma client)
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

## Development Workflow

### Setup

```bash
git clone --recurse-submodules https://github.com/archeusllc/band-together.git
cd band-together
make install

# Start local PostgreSQL and Adminer
docker compose up -d

# Access Adminer at http://localhost:8080
# Login: System=PostgreSQL, Server=postgres, Username=postgres, Password=(from .env), Database=band_together
```

### Daily Workflow

```bash
# Single command to stage, commit, and push everything
make sync-all

# Or with custom message
make sync-all MSG='your message'

# Equivalent commands:
bun git:sync
npm run git:sync
./scripts/sync-all.sh
```

### Available Commands

```bash
make help                    # View all commands

# Workflow
make sync-all              # Stage, commit, push (recommended)

# Individual operations
make pull-submodules       # Pull latest from all submodules
make stage-all             # Stage all changes
make commit-all            # Commit all staged changes
make push-all              # Push all repos to remote
make check-dirty           # Check for uncommitted submodule changes

# Utilities
make install               # Install dependencies
make status                # Show git status
make clean                 # Remove node_modules
```

### Database

**Docker Compose Setup:**

```bash
# Start PostgreSQL and Adminer
docker compose up -d

# Stop services
docker compose down

# Connect to PostgreSQL via terminal
bun db:connect
# or
npm run db:connect
```

**Environment Variables:**

Database credentials are stored in `.env` (git-ignored):
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<random-password>
POSTGRES_DB=band_together
```

Use `.env.example` as a template for new setups.

**Adminer (Database GUI):**
- Access at `http://localhost:8080`
- Simple phpMyAdmin-like interface for PostgreSQL
- No server registration needed (vs pgAdmin)
- Login credentials from `.env` file

### DB Module (`@band-together/db`) & Shared Module (`@band-together/shared`)

The `db` module hosts the Prisma schema/migrations and generates a client. The `shared` module commits the generated client and exposes a configured factory for consumption by the API and other packages.

**db provides:**
- Prisma schema with 7 models: User, Band, BandMember, Song, Setlist, SetlistSong, Rehearsal, Gig
- Migrations & Prisma 7 config
- `bun run generate` outputs to `db/generated/` and copies to `shared/generated/prisma-client/`

**shared provides:**
- Committed Prisma client (`generated/prisma-client/`)
- Configured `PrismaClient(options?)` using PrismaPg
- Declares `@prisma/client` so consumers get Prisma runtime automatically

**Development (db):**

```bash
cd db && bun run generate   # generates and copies to shared

# Create a new migration
bun run migrate:dev --name description

# Deploy migrations to database
bun run migrate:deploy

# Open Prisma Studio (visual database browser)
bun run studio
```

**Exports (shared):**

The `@band-together/shared` package provides:
- `PrismaClient(options?)` — Configured factory for the Prisma client
- Committed generated client under `generated/prisma-client/`
- Prisma model types via the generated client

### API-Shared Integration

The API imports PrismaClient from the shared module:

```typescript
import { PrismaClient } from '@band-together/shared';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });
```

**Key points:**
- Prisma 7 requires an adapter (PrismaPg for PostgreSQL)
- DATABASE_URL should be set (shared/.env supported via dotenv)
- **Shared module is imported from GitHub** (`"@band-together/shared": "github:archeusllc/bt-shared"`) — intentional for consistency across environments
- Do not change this to a local workspace import (`workspace:../shared`) even though Bun supports it; this ensures all environments consume the same committed generated Prisma client
- Changes to db schema → `bun run generate` (db) → copied into shared → submodule push → API auto-pulls latest commit

### Key Features

1. **Automatic Commit Messages** — `commit-all` and `sync-all` auto-generate commit messages based on which submodules changed
2. **Dirty Submodule Protection** — Pre-commit hook prevents committing parent repo with dirty submodules
3. **Submodule Reference Management** — `sync-all` automatically re-stages parent repo after submodule commits to capture updated hashes
4. **One-Command Sync** — `sync-all` handles the complex sequence: stage submodules → commit submodules → re-stage parent (for hash updates) → commit parent → push all

### Script Details

All scripts are in `./scripts/`:
- `sync-all.sh` — Main workflow (stage → commit → push with submodule ref handling)
- `stage-all.sh` — Stage changes in all repos
- `commit-all.sh` — Commit with auto-generated or custom messages
- `push-all.sh` — Push all repos to remote
- `check-dirty.sh` — Check for uncommitted changes
- `pre-commit-hook.sh` — Git hook for dirty submodule detection
- `setup-hooks.sh` — Install git hooks

### Submodule References

When submodules are committed, their commit hashes update. The parent repo must track these new hashes. `sync-all` handles this automatically by:
1. Committing changes in each submodule
2. Re-staging the parent repo to capture the new submodule hash references
3. Committing the parent repo with updated submodule references
4. Pushing all changes

This ensures the parent repo's `.gitmodules` and submodule index are always in sync.

## Documentation Structure

- **This file (CLAUDE.md)** — Project context, tech stack, workflow
- **[README.md](README.md)** — Quick start, setup, commands
- **[Makefile](Makefile)** — Make targets and commands
- **[package.json](package.json)** — npm/bun scripts (git:*, db:*, install-all, clean)
  - `git:sync`, `git:stage`, `git:commit`, `git:push` — Git workflow
  - `git:pull`, `git:check`, `git:status` — Git utilities  
  - `db:connect` — Connect to PostgreSQL via psql
- **Submodule READMEs:**
  - [bt-client](https://github.com/archeusllc/bt-client) — Expo app setup
  - [bt-api](https://github.com/archeusllc/bt-api) — API endpoints and development
  - [bt-db](https://github.com/archeusllc/bt-db) — Database schema and migrations
- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Full project documentation
