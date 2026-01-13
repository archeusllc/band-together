# Band Together

A band companion app for scheduling, setlists, and gig booking.

## Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Development guide for working with db and api modules
- **[CLAUDE.md](CLAUDE.md)** — Project context, tech stack, and architecture
- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Full project documentation

## Quick Start

### 1. Prerequisites

- Bun installed (https://bun.sh/docs/installation)
- Docker Desktop installed **and running**

### 2. Clone the Repository

```bash
git clone https://github.com/archeusllc/band-together.git
```

```bash
cd band-together
```

### 3. Automated Setup

Run the setup script (initializes submodules, creates env files, installs deps, sets up database, and starts dev environment):

```bash
make setup
```

Or use the script directly:

```bash
./scripts/setup.sh
```

This will:
1. Initialize git submodules
2. Create `.env` files from `.env.example` templates
3. Install all dependencies
4. Start Docker Compose (PostgreSQL + Adminer)
5. Generate Prisma client and run migrations
6. Start the dev environment (API in background, Expo in foreground with QR and auto-open browser)

## Structure

This repo uses git submodules:

| Submodule | Repository |
|-----------|------------|
| `client/` | [archeusllc/bt-client](https://github.com/archeusllc/bt-client) — Expo React Native app |
| `api/` | [archeusllc/bt-api](https://github.com/archeusllc/bt-api) — Bun/Elysia backend |
| `db/` | [archeusllc/bt-db](https://github.com/archeusllc/bt-db) — Prisma schema + migrations |
| `shared/` | [archeusllc/bt-shared](https://github.com/archeusllc/bt-shared) — Shared types/utilities and generated Prisma client |

## Workflows

### Start Dev Environment

Start the dev environment (ensures DB is running, starts API in background, Expo in foreground):

```bash
make dev
```

Or:

```bash
bun run dev
```

### Sync All Changes

Stage, commit, and push all changes in one command:

```bash
make sync-all
```

With a custom message:

```bash
make sync-all MSG='your message'
```

### Individual Commands (Make)

View all available commands:

```bash
make help
```

Install all dependencies:

```bash
make install
```

Pull latest from all submodules:

```bash
make pull-submodules
```

Stage all changes:

```bash
make stage-all
```

Commit (auto-generates message):

```bash
make commit-all
```

Push all repos:

```bash
make push-all
```

Check for uncommitted changes:

```bash
make check-dirty
```

### Individual Commands (Bun)

Complete automated setup:

```bash
bun run setup
```

Start dev environment:

```bash
bun run dev
```

Sync all changes:

```bash
bun git:sync
```

Initialize submodules:

```bash
bun git:submodules
```

Pull latest from all submodules:

```bash
bun git:pull
```

Stage all changes:

```bash
bun git:stage
```

Commit (auto-generates message):

```bash
bun git:commit
```

Push all repos:

```bash
bun git:push
```

Check for uncommitted changes:

```bash
bun git:check
```

## Development

### Manual Setup

If you didn't run `make setup`, you can set up manually.

Create `.env` files from examples:

```bash
cp .env.example .env
```

```bash
cp shared/.env.example shared/.env
```

```bash
cp db/.env.example db/.env
```

```bash
cp api/.env.example api/.env
```

Install dependencies for all submodules:

```bash
make install
```

Start local PostgreSQL:

```bash
docker compose up -d
```

Generate Prisma client and run migrations:

```bash
cd db && bun run generate && bunx --bun prisma migrate deploy && cd ..
```

Start the dev environment (API background + Expo foreground):

```bash
./scripts/dev.sh
```

The API will be available at `http://localhost:3000` with a `/health` endpoint, and Expo will show the QR code and open the dev URL in your browser.

### Visual Database Management

Open Prisma Studio at http://localhost:5555:

```bash
cd db && bun run studio
```

### Submodule Documentation

See individual submodule READMEs for specific setup:
- [bt-client README](https://github.com/archeusllc/bt-client#readme) — Expo app setup and development
- [bt-api README](https://github.com/archeusllc/bt-api#readme) — API server and endpoints
- [bt-db README](https://github.com/archeusllc/bt-db#readme) — Database schema and migrations
- [bt-shared README](https://github.com/archeusllc/bt-shared#readme) — Shared types and Prisma client usage

## Advanced

### Git Hooks

Install the pre-commit hook that prevents committing with dirty submodules:

```bash
./scripts/setup-hooks.sh
```

### Workflow Details

The `make sync-all` command:
1. Stages all changes in submodules and parent repo
2. Commits submodule changes
3. Re-stages parent repo (to capture updated submodule references)
4. Commits parent repo
5. Pushes all repos to remote

Commit messages are auto-generated based on which submodules changed, but you can provide a custom message with the `MSG` flag.
