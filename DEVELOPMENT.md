# Development Guide

This guide covers common development tasks for the Band Together project.

docker compose up -d
## Quick Start

Prereqs: Bun installed; Docker Desktop installed **and running**.

```bash
# Full setup + start dev environment (API background, Expo foreground)
make setup

# Or start dev environment after setup
./scripts/dev.sh
```

API: `http://localhost:3000` (health: `/health`)
Expo: auto-opens `http://localhost:8081` and shows QR in the terminal.

## Working with the Database and Shared Modules

### Understanding the Setup

The `db` module contains:
- **Prisma schema** — Definition of all database models (User, Band, BandMember, Song, Setlist, SetlistSong, Rehearsal, Gig)
- **Generated Prisma Client** — Output to `db/generated/` and copied to `shared/generated/prisma-client/`
- **Migrations** — Database version control
- **prisma.config.ts** — Configuration for Prisma 7

The `shared` module provides:
- **Configured PrismaClient factory** — `PrismaClient(options?)` using the PrismaPg adapter
- **Environment management** — Reads `DATABASE_URL` from `.env` in `shared/`
- **Distribution** — Generated client committed under `shared/generated/prisma-client/`

### Common Tasks

**Generate Prisma Client after schema changes (also copies to shared):**
```bash
cd db && bun run generate
```

**Create a new migration:**
```bash
cd db
bun run migrate:dev --name add_new_field
```

**Apply migrations to the database:**
```bash
cd db && bun run migrate:deploy
```

**Open Prisma Studio (visual database manager):**
```bash
cd db && bun run studio
# Opens at http://localhost:5555
```

**View migration status:**
```bash
cd db && bunx --bun prisma migrate status
```

### Making Schema Changes

1. Edit `db/prisma/schema.prisma`
2. Run `bun run migrate:dev --name describe_change` in db/
3. Review and confirm the migration
4. Run `bun run generate` to regenerate the Prisma Client
5. Commit and push the db submodule
6. Update the API's db dependency if needed

## Working with the API Module (`@band-together/api`)

### Understanding the Setup

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
- DATABASE_URL is read from `.env`
- **Shared module is pulled from GitHub** (`"@band-together/shared": "github:archeusllc/bt-shared"`) — this is intentional to ensure consistency across environments
- Do not change this to a local workspace import (`workspace:../shared`) even though Bun supports it
- Local generated client in `shared/generated/prisma-client/` is committed for distribution

### Common Tasks

**Start development server (with hot reload):**
```bash
cd api && bun run dev
```

**Start production server:**
```bash
cd api && bun run start
```

**Clean install (useful if node_modules is corrupted):**
```bash
cd api && bun run reset
```

**Check API health:**
```bash
curl http://localhost:3000/health
```

## Database Connection

### Environment Setup

The `.env` file in the root contains database credentials for Docker Compose, and `shared/.env` holds the app `DATABASE_URL` used by the Prisma adapter.

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=band_together
```

This is used by Docker Compose. The API also reads `DATABASE_URL` (via the shared module configuration):

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/band_together"
```

### Starting/Stopping PostgreSQL

```bash
# Start PostgreSQL container
docker compose up -d

# Stop PostgreSQL container
docker compose down

# View logs
docker compose logs -f postgres

# Access PostgreSQL directly
bun db:connect
```

### Using Adminer (Database GUI)

Adminer provides a web interface for the database:

1. Ensure Docker is running: `docker compose up -d`
2. Open http://localhost:8080
3. Log in with credentials from `.env`
4. Browse tables, run queries, etc.

## Schema Models

The database has 7 core models:

| Model | Purpose |
|-------|---------|
| **User** | Firebase-authenticated users with profiles |
| **Band** | Bands/groups of musicians |
| **BandMember** | User-band relationships with roles (admin/member) |
| **Song** | Songs in a band's catalog |
| **Setlist** | Collections of songs for events |
| **SetlistSong** | Join table linking songs to setlists (with ordering) |
| **Rehearsal** | Practice sessions |
| **Gig** | Live performances |

All models include:
- `id` — Unique identifier (cuid)
- `createdAt` — Creation timestamp
- `updatedAt` — Last update timestamp

### Key Relationships

- **User → Band** (many-to-many via BandMember)
- **Band → Setlist** (one-to-many)
- **Band → Song** (one-to-many)
- **Setlist → Song** (many-to-many via SetlistSong)
- **Band → Rehearsal** (one-to-many)
- **Band → Gig** (one-to-many)

## Workflow: Schema → Shared → API

When you modify the database schema:

1. **Edit schema** in `db/prisma/schema.prisma`
2. **Create migration:** `cd db && bun run migrate:dev --name description`
3. **Generate client:** `cd db && bun run generate` (copies to `shared/generated/prisma-client/`)
4. **Commit db + shared changes** (db migration + shared generated client)
5. **Push submodules**
6. **API uses shared module** — workspace link locally, GitHub in deployment
7. **Restart API server**

## Troubleshooting

### Initial Setup Issues

#### Prisma 7 Node.js Version Check with Bun

**Problem:** During `bun install` in the `db/` module, you see:
```
Prisma only supports Node.js versions 20.19+, 22.12+, 24.0+.
Please upgrade your Node.js version.
error: preinstall script from "prisma" exited with 1
```

**Context:** Prisma 7 has a preinstall script that checks Node.js version. This check runs even when using Bun as the runtime, and will fail if Node.js is not installed or is an older version.

**Solution:** Use the `--bun` flag with `bunx` to bypass Node.js version checks:
```bash
cd db && bunx --bun bun install
```

This is already configured in the root `make install` target, but if installing manually, remember this flag.

#### Database Credentials Mismatch

**Problem:** After running `bun run migrate:deploy`, you get:
```
Error: P1000: Authentication failed against database server, 
the provided database credentials for `postgres` are not valid.
```

**Context:** The `.env.example` files contain default credentials, but your PostgreSQL container may have been initialized with different credentials. Docker volumes persist across container restarts, so the actual credentials are whatever was used when the container was first created.

**Solution:** 
1. Check your running PostgreSQL container's credentials:
   ```bash
   docker inspect bandtogether-postgres --format='{{range .Config.Env}}{{println .}}{{end}}' | grep POSTGRES
   ```
2. Update `.env`, `api/.env`, `shared/.env`, and `db/.env` with the actual credentials from the container
3. Retry the migration:
   ```bash
   cd db && bun run migrate:deploy
   ```

**Prevention:** If setting up from scratch, either:
- Create a fresh PostgreSQL container with known credentials
- Copy credentials from a running container to `.env` files before running migrations

#### Docker Container Name Conflict

**Problem:** Running `docker compose up -d` returns:
```
Error response from daemon: Conflict. The container name "/bandtogether-postgres" 
is already in use by another container
```

**Solution:** The container already exists (perhaps from a previous setup attempt):
```bash
# Option 1: Restart the existing container
docker compose restart

# Option 2: Remove old container and recreate
docker compose down
docker compose up -d
```

### API won't start

**Problem:** PrismaClient initialization error
**Solution:** Ensure DATABASE_URL is set in `.env` and PostgreSQL is running (`docker compose up -d`)

### "Cannot find module '@band-together/shared'"

**Problem:** shared module not installed
**Solution:**
```bash
cd api
rm -rf node_modules bun.lock
bun install
```

### Prisma Client types are outdated

**Problem:** Changes in db/prisma/schema.prisma aren't reflected
**Solution:**
```bash
cd db
bun run generate
cd ../api
bun install  # to pull latest shared module
```

### Database connection refused

**Problem:** "connect ECONNREFUSED 127.0.0.1:5432"
**Solution:**
```bash
# Start PostgreSQL
docker compose up -d

# Verify it's running
docker compose ps
```

### Migration conflicts

**Problem:** Multiple `.dev` or `.test` branches modified schema
**Solution:**
```bash
cd db
# Reset to main state
git checkout main
git reset --hard origin/main

# Re-apply your changes
# Edit schema...
bun run migrate:dev --name your_change
```

## API Development

### Adding Endpoints

Create route handlers in the API:

```typescript
import Elysia from 'elysia';
import { prisma } from './services/database';

const app = new Elysia()
  .get('/bands', async () => {
    return await prisma.band.findMany();
  })
  .post('/bands', async ({ body }) => {
    return await prisma.band.create({
      data: body
    });
  })
  .listen(3000);
```

### Using PrismaClient

```typescript
import { prisma } from './services/database';

// Query examples
const users = await prisma.user.findMany();
const band = await prisma.band.findUnique({ where: { id: 'xyz' } });
const setlists = await prisma.setlist.findMany({
  include: { songs: true }
});

// Create
const newBand = await prisma.band.create({
  data: { name: 'The Beatles' }
});

// Update
await prisma.band.update({
  where: { id: 'xyz' },
  data: { name: 'The Beatles Reunion' }
});

// Delete
await prisma.band.delete({ where: { id: 'xyz' } });
```

## Testing

Documentation coming soon as test infrastructure is set up.

## Deployment

See [CLAUDE.md](CLAUDE.md) for deployment target information (Railway or Fly.io).

## Getting Help

- **Project context:** See [CLAUDE.md](CLAUDE.md)
- **API docs:** See [bt-api README](https://github.com/archeusllc/bt-api)
- **Database schema:** See [bt-db README](https://github.com/archeusllc/bt-db)
- **Client setup:** See [bt-client README](https://github.com/archeusllc/bt-client)
- **Full documentation:** See [Wiki](https://github.com/archeusllc/band-together/wiki)
