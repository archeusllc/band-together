# Development Guide

This guide covers common development tasks for the Band Together project.

## Quick Start

Prereqs: Bun installed; Docker Desktop installed **and running**.

```bash
# Full setup + start dev environment (API background, Expo foreground)
bun install

# Or start dev environment after setup
bun dev
```

API: `http://localhost:3000`  
Expo: auto-opens browser with QR code

## Common Tasks

**Database:**
```bash
cd db && bun run migrate:dev --name description  # Create migration
cd db && bun run generate                        # Generate Prisma client
cd db && bun run studio                          # Open Prisma Studio
```

**PostgreSQL:**
```bash
docker compose up -d      # Start
docker compose down        # Stop
docker compose logs -f     # View logs
```

**Git Workflows:**
```bash
bun git:pull          # Pull all submodules
bun git:sync          # Stage, commit, push all
bun git:status        # View status
```

## Documentation

For detailed information, see:
- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Database schema, architecture, workflows
- **[CLAUDE.md](CLAUDE.md)** — Project context and architecture
- Individual submodule READMEs — Specific setup and development guides

## Troubleshooting

**Database connection refused:**
```bash
docker compose up -d
```

**Prisma client out of date:**
```bash
cd db && bun run generate
cd ../shared && bun install
```

**Cannot find module '@band-together/shared':**
```bash
cd api && bun install
```

**Container name already in use:**
```bash
docker compose down
docker compose up -d
```

For more troubleshooting help, see [CLAUDE.md](CLAUDE.md) or the [Wiki](https://github.com/archeusllc/band-together/wiki).

