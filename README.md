# Band Together

An app for musicians, venues, and fans to discover, follow, and collaborate on live music.

**Philosophy:** Cool and Useful Without Install—full functionality via web browser, no app installation or account registration required.

## Architecture

Band Together uses a **modular orchestration architecture** with independent submodules:

```
band-together/          Root repo (orchestration & coordination)
├── api/                REST API (Elysia, PostgreSQL)
├── client/             Web/Mobile App (React Native, Expo)
├── cms-api/            CMS API (Elysia, Spotify integration)
├── cms-client/         CMS Web UI (Vite, React)
├── db/                 Database Schema (Prisma, PostgreSQL)
├── schema/             Database Types (@archeusllc/schema - published package)
├── types/              API Client Types (@archeusllc/types - published package)
├── models/             Business Models (@archeusllc/models - published package)
└── wiki/               Documentation
```

Each submodule is an independent git repository that can be developed, tested, and deployed separately.

### Design Philosophy: Lean Orchestration Layer

- **Root repo** = Minimal orchestration layer, focuses on architectural coordination
- **Submodules** = Self-contained, independently deployable units
- **Type packages** = Clean interfaces between modules via `@archeusllc/schema`, `@archeusllc/types`, `@archeusllc/models`
- **Swappable** = Each module can be replaced with alternative implementation

## Quick Start

### Requirements
- [Bun](https://bun.sh/) - JavaScript runtime
- [Docker](https://www.docker.com/) - Container platform
- [Git](https://git-scm.com/) - Version control

### Clone & Setup

```bash
# Clone with all submodules
git clone --recurse-submodules https://github.com/archeusllc/band-together.git
cd band-together

# Start local services
docker compose up -d
```

This starts PostgreSQL, Prisma Studio, API (3000), and client (8081).

### Development

Work on individual modules:

```bash
cd api && bun start        # API server with watch mode
cd client && bun start     # Expo dev server (web, iOS, Android)
cd db && bun start         # Prisma Studio
cd cms-api && bun start    # CMS API server
cd cms-client && bun run dev  # Vite dev server
```

See submodule READMEs for specific setup and each module's CLAUDE.md for development patterns.

## Key Features

- ✨ **Web First, No Install** - Full feature parity in browser, iOS, Android
- 🎤 **Discover Live Music** - Follow venues, acts; get personalized event feeds
- 📋 **Collaborative Setlists** - Create and share setlists with real-time sync
- 🎵 **Track Database** - Browse 2M+ songs with Spotify integration
- 👥 **Community** - Musicians, venues, and fans connect
- 🌙 **Dark Mode** - System theme support
- 📱 **Responsive** - Mobile-optimized UI with Tailwind CSS

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Client | React Native, Expo, NativeWind |
| Backend | Elysia, TypeScript, PostgreSQL, Prisma |
| Authentication | Firebase |
| Styling | Tailwind CSS, NativeWind |
| Infrastructure | Docker, GitHub Actions, fly.io, EAS |

## Documentation

**Start here:**
- [Wiki Home](wiki/Home.md) - Project dashboard and navigation
- [Architecture Overview](wiki/Architecture-Overview.md) - System design and module interactions
- [Package System](wiki/Architecture-Packages.md) ⚠️ **CRITICAL** - How type packages work

**Development:**
- [Coding Philosophy](wiki/Coding-Philosophy.md) - Development principles
- [Git Workflow](wiki/Git-Workflow.md) - Commit conventions, branching, submodule practices
- [Lessons Learned](wiki/lessons/) - Frontend, Backend, Database, Architecture, Testing

**Operations:**
- [Deployment Guide](wiki/Deployment.md) - Current deployment status and procedures

**Reference:**
- **Submodule README.md** - Quick start for each module
- **Submodule CLAUDE.md** - Domain-specific patterns and conventions
- [Archived Docs](wiki/archive/2026-01-26/) - Historical reference (outdated)

## Deployment Status

| Component | Status | Environment |
|-----------|--------|-------------|
| Client | Active | EAS (Android Preview) |
| Main API | Active | fly.io (api-staging) |
| CMS API | Active | fly.io (cms-api-staging) |
| Database | Active | fly.io PostgreSQL |

**Note:** iOS builds not available (no Apple developer account). iOS release planned for future.

## Contributing

1. **Read the architecture:** [Architecture Overview](wiki/Architecture-Overview.md)
2. **Choose a module** to work on
3. **Read that module's README.md** for quick start
4. **Read that module's CLAUDE.md** for development patterns
5. **Follow [Git Workflow](wiki/Git-Workflow.md)** for commits and PRs

## Questions?

- **Architecture & Design:** [Architecture Overview](wiki/Architecture-Overview.md)
- **How packages work:** [Package System](wiki/Architecture-Packages.md)
- **Development patterns:** Each module's CLAUDE.md
- **Quick start:** Each module's README.md
- **Module-specific help:** Check module README.md and CLAUDE.md
- **Full documentation:** [Wiki](wiki/Home.md)

---

**Last Updated:** 2026-01-26 | [Full Documentation](wiki/Home.md)
