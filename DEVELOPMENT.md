# Band Together - Development Guide

## Quick Start

### Prerequisites
- Bun 1.3+ (or Node.js 18+)
- Docker & Docker Compose
- PostgreSQL 14+ (via Docker)

### Recommended Development Setup

For the best development experience with hot reload and Expo Go testing, we recommend running backend services in Docker and the client locally.

#### Terminal 1: Start Backend Services
```bash
# Start all backend services (database, APIs, CMS)
docker compose up postgres adminer api api-cms prisma-studio cms
```

This starts:
- **postgres** - Database (port 5432)
- **adminer** - Database UI (port 8080)
- **api** - Main API (port 3000)
- **api-cms** - CMS API (port 3001)
- **cms** - Admin dashboard (port 5173)
- **prisma-studio** - Database studio (port 5555)

#### Terminal 2: Start Client (Expo)
```bash
cd client
bun install  # if needed
bun start
```

Then use Expo Go on your phone to scan the QR code from the terminal output.

### Full Stack (All Services in Docker)

If you prefer everything containerized:

```bash
docker compose up
```

This runs all 6 services. Access services at:
- **Web App**: http://localhost:8081
- **Admin CMS**: http://localhost:5173
- **Main API**: http://localhost:3000
- **CMS API**: http://localhost:3001
- **Database UI**: http://localhost:8080
- **Prisma Studio**: http://localhost:5555

## Service Overview

| Service | Port | Purpose | Running |
|---------|------|---------|---------|
| postgres | 5432 | PostgreSQL database | Docker |
| adminer | 8080 | Database management UI | Docker |
| prisma-studio | 5555 | Prisma database explorer | Docker |
| api | 3000 | Main REST API | Docker or Local |
| api-cms | 3001 | CMS REST API | Docker |
| web (client) | 8081 | Expo web app | Docker or Local |
| cms | 5173 | Admin React dashboard | Docker |

## Development Workflows

### Scenario 1: Working on Mobile App (Recommended)
```bash
# Terminal 1 - Backend services
docker compose up postgres adminer api api-cms

# Terminal 2 - Expo client with hot reload
cd client && bun start
```

Use Expo Go on your phone to test changes in real-time. The web service in Docker is useful for CI/testing, but local development is faster.

### Scenario 2: Working on CMS (Admin Dashboard)
```bash
# Terminal 1 - Backend services
docker compose up postgres adminer api-cms

# Terminal 2 - CMS with Vite hot reload (optional - already runs in Docker)
cd cms && bun start
```

Or just access the CMS at http://localhost:5173 from the Docker service.

### Scenario 3: Working on Main API
```bash
# Terminal 1 - Database only
docker compose up postgres

# Terminal 2 - API with watch mode
cd api && bun start

# Terminal 3 - Client
cd client && bun start
```

### Scenario 4: Full Development Environment
```bash
docker compose up
```

Then access all services via their URLs. Note: Client hot reload in Docker is slower than local development.

## Common Commands

### Database Management
```bash
# View database with Prisma Studio
docker compose exec prisma-studio sh -c "cd db && bunx prisma studio --browser none"
# Then visit http://localhost:5555

# Apply schema changes
cd db && bun push

# Seed database
cd db && bun seed
```

### Workspace Management
```bash
# Install all dependencies
bun install

# Run all services (except web)
docker compose up postgres adminer api api-cms cms

# Start only the critical services (database + APIs)
docker compose up postgres api api-cms

# Stop all services
docker compose down

# Remove all containers and volumes
docker compose down -v

# View logs from specific service
docker compose logs api -f
```

### Useful npm Scripts
```bash
# Start all services (local - mainly APIs and CMS)
bun start:all

# Kill all running processes on ports 3000, 3001, 5173
bun kill

# Type checking
bun typecheck
```

## Environment Variables

### Client (`.env.local` in `client/`)
```
# Optional - defaults to http://localhost:3000
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### API (`.env.development` in `api/`)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/band_together
```

### CMS API (`.env.development` in `api-cms/`)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/band_together
JWT_SECRET=your-secret-key
SPOTIFY_CLIENT_ID=your-spotify-id
SPOTIFY_CLIENT_SECRET=your-spotify-secret
```

### CMS Client (`.env` in `cms/`)
```
VITE_API_URL=http://localhost:3001
```

## Architecture

### Project Structure
```
band-together/
├── client/          # Expo React Native app
├── api/             # Main REST API (Elysia)
├── cms/             # Admin dashboard (Vite + React)
├── api-cms/         # CMS REST API (Elysia)
├── shared/          # Shared types and utilities
├── db/              # Database schema and Prisma config
├── compose.yml      # Docker Compose configuration
└── package.json     # Workspace scripts
```

### Key Features

**Client (Mobile/Web)**
- React Native with Expo
- Real-time setlist management
- Activity feed
- Authentication via Firebase

**Main API**
- Elysia framework with TypeScript
- REST endpoints for setlists, guilds, events
- Firebase authentication
- WebSocket support for real-time updates

**CMS (Admin Dashboard)**
- React dashboard with Vite
- Track and tag management
- Bulk import (CSV, JSON, Spotify)
- Separate JWT authentication

**Database**
- PostgreSQL with Prisma ORM
- Shared schema between main app and CMS
- Full schema in `db/prisma/schema.prisma`

## Tips for Development

1. **Hot Reload**: Both local Expo and Vite support hot reload. Make changes and see them instantly.

2. **API Testing**: Use Swagger UI at `http://localhost:3000/swagger` (if running API locally) to test endpoints.

3. **Database Changes**:
   - Edit `db/prisma/schema.prisma`
   - Run `cd db && bun push` to apply changes
   - Prisma auto-generates TypeScript types

4. **Docker Container Updates**: After changing source code in mounted volumes, changes reflect immediately. No rebuild needed.

5. **Debugging**:
   - Use browser DevTools for web/CMS
   - Use Expo DevTools for mobile debugging
   - Check Docker logs: `docker compose logs service-name -f`

## Troubleshooting

### Port Already in Use
```bash
bun kill  # Kill all Band Together processes
```

### Docker Container Won't Start
```bash
# Check logs
docker compose logs service-name

# Rebuild and restart
docker compose down
docker compose up --build
```

### Database Connection Issues
```bash
# Verify database is running
docker compose exec postgres psql -U postgres -c "\l"

# Check Prisma connection
cd db && bunx prisma db push
```

### Module Not Found Errors
```bash
# Reinstall shared module in dependent packages
bun install
```

## Testing

```bash
# Run all tests
bun test

# Run specific service tests
cd api && bun test
cd api-cms && bun test
```

## Deployment

See respective README files:
- Main app: Check `client/` and `api/` docs
- CMS: See `cms/README.md`
- Staging deployment: `bun run deploy:staging`

---

**Last Updated**: 2026-01-25
