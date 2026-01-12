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

## Development Workflow

### Setup

```bash
git clone --recurse-submodules https://github.com/archeusllc/band-together.git
cd band-together
make install
```

### Daily Workflow

```bash
# Single command to stage, commit, and push everything
make sync-all

# Or with custom message
make sync-all MSG='your message'

# Equivalent commands:
bun sync-all
npm run sync-all
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
- **[package.json](package.json)** — npm/bun scripts
- **Submodule READMEs:**
  - [bt-client](https://github.com/archeusllc/bt-client) — Expo app setup
  - [bt-api](https://github.com/archeusllc/bt-api) — API endpoints and development
  - [bt-db](https://github.com/archeusllc/bt-db) — Database schema and migrations
- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Full project documentation
