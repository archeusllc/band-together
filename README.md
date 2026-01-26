# Band Together

An app for musicians, venues, and fans to discover, follow, and collaborate on live music events.

- **[Wiki](wiki/)** — Full project documentation including AI Context and implementation plans
- **[Development Guide](DEVELOPMENT.md)** — Submodule workflow and development instructions

## Architecture

Band Together is organized as a git submodule monorepo with independent modules:

```
band-together/          (main repo - orchestration & Docker)
├── api/                 REST API (Elysia)
├── client/              React Native mobile app (Expo)
├── cms-api/             CMS/Admin API (Elysia)
├── cms-client/          CMS/Admin web app (Vite + React)
├── db/                  Database schema & Prisma
├── types/               Shared TypeScript types (published package)
└── wiki/                Documentation
```

Each module is a complete, independent git repository that can be developed and deployed separately.

## Quick Start

### Requirements

- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Docker](https://www.docker.com/) - Container platform
- [Git](https://git-scm.com/) - Version control

### Setup

```bash
# Clone with all submodules
git clone --recurse-submodules git@github.com:archeusllc/band-together.git
cd band-together

# Install dependencies in all modules
bun run submodule:install

# Start Docker services
docker compose up -d
```

This starts:
- PostgreSQL database with sample data
- Prisma Studio (visual database explorer)
- Main REST API (port 3000)
- React Native web client (port 8081)
- CMS API (port 3001)
- CMS web app (port 5173)

### Development

Each module has its own development workflow:

```bash
cd api         && bun start    # Start API server
cd client      && bun start    # Start Expo dev server
cd db          && bun start    # Open Prisma Studio
cd cms-api     && bun start    # Start CMS API server
cd cms-client  && bun dev      # Start Vite dev server
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed instructions on each module.

## Project Structure

### Core Modules

- **[api/](api/)** - REST API with Elysia
  - Authentication, user profiles, guilds (venues/acts/clubs), events, feeds, setlists, tracks
  - OpenAPI/Swagger documentation at `/openapi`
  - Depends on `@archeusllc/types`

- **[client/](client/)** - React Native mobile app
  - Runs on web (browser), iOS, and Android
  - Expo-based with NativeWind (Tailwind CSS)
  - Real-time features: event feeds, setlist collaboration
  - Dark mode support

- **[db/](db/)** - Prisma database configuration
  - PostgreSQL schema with migrations
  - Generates Prisma types to `types/` module
  - Manages database with `bun push` and `bun start`

### Supporting Modules

- **[types/](types/)** - Shared TypeScript types
  - Published as `@archeusllc/types` npm package
  - Auto-generated Prisma client from schema
  - Automatically updated and published via GitHub Actions

- **[cms-api/](cms-api/)** & **[cms-client/](cms-client/)** - Content management system
  - Track management, Spotify integration, bulk imports
  - Standalone from main app with independent authentication

- **[wiki/](wiki/)** - Project documentation
  - AI Context guide with full architecture details
  - Implementation plans and guides

## Development Workflow

### Making Changes

1. **Choose your module** - Work on `api`, `client`, `db`, `cms-api`, `cms-client`, or `types`
2. **Create a feature branch** in the module:
   ```bash
   cd api
   git checkout -b feature/new-endpoint
   # Make your changes
   git commit -m "Add new endpoint"
   git push origin feature/new-endpoint
   ```
3. **Create a PR** in the module's GitHub repository
4. **After merge**, update main repo submodule reference:
   ```bash
   git submodule update --remote api
   git add api
   git commit -m "Update api submodule to latest"
   git push
   ```

### Cross-Module Workflows

**Modifying Database Schema**

1. Edit `db/prisma/schema.prisma`
2. Run `bun push` in `db/`
3. GitHub Actions automatically:
   - Generates Prisma types
   - Commits to `types/` repo
   - Publishes new version
4. Update consumers: `bun update @archeusllc/types && bun install`

**Using New API Endpoints in Client**

1. API changes merged in `band-together-api`
2. Update main repo: `git submodule update --remote api`
3. Client uses Eden Treaty: `await api.endpoint.get()`
4. Make client changes and push to `band-together-client`

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed workflows.

## Key Features

- ✨ **Web-First, App Compatible** - Works in browser (web), iOS, and Android
- 🎤 **Discover Live Music** - Follow venues, acts, and clubs; get personalized event feeds
- 📋 **Collaborative Setlists** - Create and share setlists with real-time collaboration
- 🎵 **Track Database** - Browse 2M+ songs with Spotify integration
- 👥 **Community** - Fans, musicians, and venues connect and share
- 🌙 **Dark Mode** - Automatic light/dark theme based on device preference
- 📱 **Responsive Design** - Mobile-optimized UI with Tailwind CSS

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Client** | React Native, Expo, NativeWind | Web, iOS, Android app |
| **API** | Elysia, TypeScript | Type-safe REST API |
| **Database** | PostgreSQL, Prisma | Persistent data layer |
| **Auth** | Firebase | User authentication |
| **Styling** | Tailwind CSS, NativeWind | Responsive design |
| **Types** | TypeScript, Prisma | Type safety across modules |
| **Infrastructure** | Docker, GitHub Actions | Development and CI/CD |

## Documentation

- **[AI Context Guide](wiki/AI-Context.md)** - Comprehensive project guide for AI assistants
- **[Development Guide](DEVELOPMENT.md)** - How to work with the submodule structure
- **[Planning Docs](wiki/)** - Implementation plans for major features

## Running Tests

Each module has tests. Run them with:

```bash
cd api && bun run test        # API tests
cd client && bun run test     # Client tests (if configured)
```

## Contributing

1. Check [DEVELOPMENT.md](DEVELOPMENT.md) for setup instructions
2. Pick a module to work on
3. Follow that module's development workflow
4. Create PR in that module's repository
5. Update main repo submodule reference after merge

## License

[Add your license here]

## Questions?

- 🏗️ **Architecture**: See [AI Context](wiki/AI-Context.md)
- 📋 **Module-specific**: Check module README.md
- 🔧 **Development**: See [DEVELOPMENT.md](DEVELOPMENT.md)
- 📖 **Full docs**: Check [wiki/](wiki/) directory
