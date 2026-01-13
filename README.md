# Band Together

A band companion app for scheduling, setlists, and gig booking.

## Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Development guide for working with db and api modules
- **[CLAUDE.md](CLAUDE.md)** — Project context, tech stack, and architecture
- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Full project documentation

## Structure

This repo uses git submodules:

| Submodule | Repository |
|-----------|------------|
| `client/` | [archeusllc/bt-client](https://github.com/archeusllc/bt-client) — Expo React Native app |
| `api/` | [archeusllc/bt-api](https://github.com/archeusllc/bt-api) — Bun/Elysia backend |
| `db/` | [archeusllc/bt-db](https://github.com/archeusllc/bt-db) — Prisma schema + migrations |
| `shared/` | [archeusllc/bt-shared](https://github.com/archeusllc/bt-shared) — Shared types/utilities and generated Prisma client |

## Quick Start

> **⚠️ Important:** This repository uses git submodules. When cloning, always use the `--recurse-submodules` flag or initialize them after cloning. See [Manual setup](#manual-setup) below.

### Automated Setup (recommended)

```bash
# Complete setup from fresh clone (submodules, env, dependencies, database)
make setup

# Or run the script directly
./scripts/setup.sh
```

This will:
1. Initialize git submodules
2. Create `.env` files from `.env.example` templates
3. Install all dependencies
4. Start Docker Compose (PostgreSQL + Adminer)
5. Generate Prisma client and run migrations

### Using Make for Workflows

```bash
# Sync all changes (stage, commit, push)
make sync-all

# Or individual commands:
make install            # Install all dependencies
make pull-submodules    # Pull latest from all submodules
make stage-all          # Stage all changes
make commit-all         # Commit (auto-generates message)
make push-all           # Push all repos
make check-dirty        # Check for uncommitted changes

# View all available commands
make help
```

### Using npm/bun scripts

```bash
# Complete automated setup
bun run setup

# Sync all changes in one command
bun git:sync

# Or individual commands:
bun git:submodules      # Initialize submodules
bun git:pull            # Pull latest from all submodules
bun git:stage           # Stage all changes
bun git:commit          # Commit (auto-generates message)
bun git:push            # Push all repos
bun git:check           # Check for uncommitted changes
```

### Manual setup

Clone with submodules
```bash
git clone --recurse-submodules https://github.com/archeusllc/band-together.git
```

Or init submodules after clone
```bash
git submodule update --init --recursive
```

## Development

### Local Setup

If you didn't run `make setup`, you can set up manually:

```bash
# 1. Create .env files from examples
cp .env.example .env
cp shared/.env.example shared/.env
cp db/.env.example db/.env
cp api/.env.example api/.env

# 2. Install dependencies for all submodules
make install

# 3. Start local PostgreSQL
docker compose up -d

# 4. Generate Prisma client and run migrations
cd db && bun run generate && bunx --bun prisma migrate deploy && cd ..

# 5. Start the API server
cd api && bun run dev
```

The API will be available at `http://localhost:3000` with a `/health` endpoint to check database connection.

**Optional: Visual Database Management**

```bash
cd db && bun run studio
# Opens Prisma Studio at http://localhost:5555
```

### Submodule Documentation

See individual submodule READMEs for specific setup:
- [bt-client README](https://github.com/archeusllc/bt-client#readme) — Expo app setup and development
- [bt-api README](https://github.com/archeusllc/bt-api#readme) — API server and endpoints
- [bt-db README](https://github.com/archeusllc/bt-db#readme) — Database schema and migrations
- [bt-shared README](https://github.com/archeusllc/bt-shared#readme) — Shared types and Prisma client usage

## Workflow

**Single command to sync everything:**

```bash
make sync-all
# or with custom message:
make sync-all MSG='your message'
```

This will:
1. Stage all changes in submodules and parent repo
2. Commit submodule changes
3. Re-stage parent repo (to capture updated submodule references)
4. Commit parent repo
5. Push all repos to remote

**Commit messages are auto-generated** based on which submodules changed, but you can provide a custom message with the `MSG` flag.

## Git Hooks

The project includes a pre-commit hook that prevents committing with dirty submodules. To install it:

```bash
./scripts/setup-hooks.sh
```
