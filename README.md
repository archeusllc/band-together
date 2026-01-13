# Band Together

A band companion app for scheduling, setlists, and gig booking.

## Quick Start

### Prerequisites
- Bun installed (https://bun.sh/docs/installation)
- Docker Desktop installed **and running**

### Clone and Setup

```bash
git clone https://github.com/archeusllc/band-together.git
cd band-together
bun install
```

This initializes submodules, creates env files, installs dependencies, and starts the dev environment.

### Start Developing

```bash
bun dev
```

## Documentation

- **[Wiki](https://github.com/archeusllc/band-together/wiki)** — Full project documentation
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Development guide
- **[CLAUDE.md](CLAUDE.md)** — Project context and architecture
6. Launches the dev environment

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

### Workflow Details

The `bun git:sync` command:
1. Stages all changes in submodules and parent repo
2. Commits submodule changes
3. Re-stages parent repo (to capture updated submodule references)
4. Commits parent repo
5. Pushes all repos to remote

Commit messages are auto-generated based on which submodules changed, but you can provide a custom message with the `MSG` flag.
