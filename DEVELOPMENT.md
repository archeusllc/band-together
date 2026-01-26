# Development Guide - Band Together Submodule Architecture

This document explains how to work with Band Together's git submodule structure.

## Quick Start

### First Time Setup

```bash
# Clone with submodules
git clone --recurse-submodules git@github.com:archeusllc/band-together.git
cd band-together

# Update submodules (in case they diverged)
bun run submodule:update

# Install all modules
bun run submodule:install
```

### Start Development Environment

```bash
# Start Docker services (database, Prisma Studio, API, client, CMS)
docker compose up -d

# Or start individual services:
docker compose up db        # Database + Prisma Studio
docker compose up api       # Main API
docker compose up client    # React Native web
docker compose up cms-api   # CMS API
docker compose up cms-client# CMS web app
```

## Repository Structure

Each module is its own independent git repository:

```
band-together/                          (main repo - orchestration)
├── db/                                  (band-together-db submodule)
│   ├── prisma/schema.prisma            # Database schema
│   └── README.md                        # db-specific instructions
├── api/                                 (band-together-api submodule)
│   ├── src/routes/                      # API endpoints
│   └── README.md                        # API-specific instructions
├── client/                              (band-together-client submodule)
│   ├── src/screens/                     # Mobile app screens
│   └── README.md                        # Client-specific instructions
├── cms-api/                             (band-together-cms-api submodule)
│   ├── src/routes/                      # CMS API endpoints
│   └── README.md                        # CMS API-specific instructions
├── cms-client/                          (band-together-cms-client submodule)
│   ├── src/pages/                       # CMS web pages
│   └── README.md                        # CMS client-specific instructions
├── types/                               (band-together-types submodule)
│   └── README.md                        # Shared types documentation
├── wiki/                                (band-together-wiki submodule)
│   └── AI-Context.md                    # Full project context
└── compose.yml                          # Docker orchestration
```

## Working on a Module

### Checkout a Branch in a Module

```bash
cd api
git checkout -b feature/new-endpoint
# Make your changes
git add .
git commit -m "Add new endpoint"
git push origin feature/new-endpoint
```

Then create a PR in the `band-together-api` repository on GitHub.

### Updating Main Repo After Submodule Changes

After merging a PR in a submodule repository, update the main repo:

```bash
# From band-together root
git submodule update --remote api
git add api
git commit -m "Update api submodule to latest"
git push origin main
```

Or use the convenience script:

```bash
bun run submodule:update
```

## Cross-Module Workflows

### Modifying Database Schema

1. Edit `db/prisma/schema.prisma`
2. Run `cd db && bun push` to apply to database
3. GitHub Actions automatically:
   - Generates Prisma types
   - Commits to `types` repo
   - Bumps version and publishes
4. Update consumers:
   ```bash
   cd api && bun update @archeusllc/types && bun install
   cd client && bun update @archeusllc/types && bun install
   ```

### Adding API Endpoints

1. Create route files in `api/src/routes/`
2. Follow the subdirectory pattern: routes/features/
3. Add routes, controller, service, tests
4. Push changes to `band-together-api`
5. Create PR and merge
6. Update main repo: `git submodule update --remote api && git add api && git commit ...`

### Client Features Using New API Endpoints

1. Ensure API changes are merged and pushed
2. In `client/`, update API client imports if needed
3. Use the Eden Treaty client: `await api.endpoint.get()`
4. Push changes to `band-together-client`
5. Update main repo submodule reference

## Submodule Troubleshooting

### Submodule shows detached HEAD

```bash
cd <module>
git checkout main
git pull
cd ..
git add <module>
git commit -m "Update <module> to latest"
```

### Submodule stuck on old commit

```bash
bun run submodule:update
```

### Changes not appearing after pull

```bash
git pull
git submodule update --init --recursive
```

### Merge conflicts in submodule references

```bash
# Check which commits conflict
git diff --name-only --diff-filter=U

# Resolve by updating to correct commit
git submodule update --remote conflicting-module
git add conflicting-module
git rebase --continue
```

## Deployment Notes

### Deploying Code Changes

Each module is independently deployable:

- **API changes**: Redeploy the `band-together-api` service
- **Client changes**: Rebuild and redeploy the `band-together-client` app
- **CMS changes**: Redeploy both `band-together-cms-api` and `band-together-cms-client`
- **Database changes**: Run migrations in the database service before deploying API

### Types Package Changes

The `types` package is published automatically by GitHub Actions when:
1. Schema changes in `db` repo
2. Prisma client is regenerated
3. Types are committed to `types` repo

Consumers update with: `bun update @archeusllc/types`

## Best Practices

1. **Keep commits focused**: Each module change should be a complete feature/fix
2. **Test before pushing**: Verify changes work before pushing to GitHub
3. **Update submodule refs**: Don't forget to update main repo after merging PRs
4. **Use semver for types**: Follow semantic versioning for types package
5. **Document breaking changes**: Note any breaking API or types changes

## GitHub Actions Automation

### Type Generation (in band-together-db)

Triggered when `prisma/schema.prisma` changes:
- Generates Prisma client
- Commits to `band-together-types`
- Automatically publishes to GitHub Packages

### Package Publishing (in band-together-types)

Triggered when Prisma types change:
- Bumps version using npm version patch
- Publishes to GitHub Packages
- Pushes version tags

## Development Commands by Module

### Database (db/)
```bash
cd db
bun install      # Install dependencies
bun push         # Push schema to database
bun start        # Open Prisma Studio
bun generate     # Generate Prisma client (auto-runs with bun push)
```

### API (api/)
```bash
cd api
bun install      # Install dependencies
bun start        # Start API server (port 3000)
bun run test     # Run tests
```

### Client (client/)
```bash
cd client
bun install      # Install dependencies
bun start        # Start Expo dev server
# Scan QR code with Expo Go or use simulator
```

### CMS API (cms-api/)
```bash
cd cms-api
bun install      # Install dependencies
bun start        # Start CMS API (port 3001)
bun run test     # Run tests
```

### CMS Client (cms-client/)
```bash
cd cms-client
bun install      # Install dependencies
bun dev          # Start Vite dev server (port 5173)
bun run build    # Build for production
```

## Questions?

- **Module-specific**: Check the README.md in each module directory
- **Overall architecture**: See `wiki/AI-Context.md`
- **Implementation plans**: See `wiki/Plan-*.md` files
