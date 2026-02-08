# CLAUDE.md - AI Assistant Guide

Welcome! This guide helps AI assistants work effectively on Band Together.

## Architecture First

Band Together is organized as a **modular orchestration architecture**:

- **Root repo** = Lean orchestration layer
- **Submodules** = Self-contained, independently deployable modules
- **Type packages** = Clean interfaces (schema, types, models)
- **Philosophy** = "Cool and Useful Without Install" - no login or install required for core functionality

## Getting Started

1. **Read Architecture:** [Architecture Overview](wiki/Architecture-Overview.md)
2. **Understand Packages:** ⚠️ **[Package System](wiki/Architecture-Packages.md) - CRITICAL KNOWLEDGE**
3. **Know the Principles:** [Coding Philosophy](wiki/Coding-Philosophy.md)
4. **Check the Module:** See the specific submodule's CLAUDE.md and README.md

## Where to Work

### If working at root repo level (orchestration):
- Read [Architecture Overview](wiki/Architecture-Overview.md)
- Understand the package system (links below)
- Coordinate changes across submodules
- Update submodule references

### If working in `api/` submodule:
- Read [api/CLAUDE.md](api/CLAUDE.md) for patterns
- See [api/README.md](api/README.md) for setup
- Reference [Lessons Learned - Backend](wiki/lessons/Backend.md)

### If working in `client/` submodule:
- Read [client/CLAUDE.md](client/CLAUDE.md) for patterns
- See [client/README.md](client/README.md) for setup
- Reference [Lessons Learned - Frontend](wiki/lessons/Frontend.md)

### If working in `db/` submodule:
- Read [db/CLAUDE.md](db/CLAUDE.md) for patterns
- See [db/README.md](db/README.md) for setup
- Reference [Lessons Learned - Database](wiki/lessons/Database.md)

### If working in `cms-api/` or `cms-client/`:
- Same patterns as api/ and client/ respectively
- Separate authentication (not Firebase)

### If working with `schema/`, `types/`, or `models/`:
- See [Package System](wiki/Architecture-Packages.md) for how they work
- See relevant submodule's README.md for quick start

## Design Philosophy

### "Cool and Useful Without Install"

- Full functionality via web browser, no app install required
- No account registration needed for core features
- Authentication only at natural security boundaries (editing, creating content)
- Organic adoption: demonstrate value first, ask for signup later

This philosophy informs all architectural decisions.

## Key Principles

Read [Coding Philosophy](wiki/Coding-Philosophy.md) for full details. Summary:

1. **Favor brevity and simplicity** over complexity
2. **Implement minimum-viable solutions** - avoid over-engineering
3. **Follow DRY** - Don't Repeat Yourself
4. **Comments for why** - Only comment non-obvious logic
5. **Avoid backwards-compatibility hacks** - Just change the code
6. **Three similar lines is better than premature abstraction**

## Package System ⚠️ CRITICAL

This project uses a **3-package architecture**:

- **`@archeusllc/schema`** - Prisma-generated database types
- **`@archeusllc/types`** - Eden Treaty API client types
- **`@archeusllc/models`** - Hand-crafted business types

**Why this matters:**
- Types are installed via package.json, not workspace symlinks
- Enables independent versioning and swappable modules
- APIs consume schema + models
- Clients consume types + models

**Must read:** [Package System - Full Details](wiki/Architecture-Packages.md)

## Environment Variables

**Short version:** `.env.development` provides defaults, `.env.local` (gitignored) overrides for local/sensitive values.

**For API modules:** Firebase credentials REQUIRED in `.env.local`
**For client:** API URL override optional in `.env.local` (defaults to localhost:3000)

See individual module READMEs for specific setup.

## Useful Commands

```bash
# Root repo
bun run submodule:install  # Install all submodules
docker compose up -d        # Start local services

# Individual modules
cd api && bun start         # Start API server
cd client && bun start      # Start Expo dev server
cd db && bun push          # Apply schema changes to database
```

## Git Workflow

- Create feature branches with descriptive names: `feature/my-feature`, `fix/bug-fix`
- Commit messages explain the why, not just the what
- Read [Git Workflow](wiki/Git-Workflow.md) for full details
- Reference issues/PRs in commit messages

## Documentation Structure

- **Root README.md** - Project overview, quick start
- **Root CLAUDE.md** - This file, AI assistant guide
- **Submodule README.md** - Quick start for each module
- **Submodule CLAUDE.md** - Domain-specific patterns
- **wiki/Home.md** - Documentation hub
- **wiki/** - Architecture, principles, lessons learned, deployment

## Before You Code

1. **Understand the architecture** - [Architecture Overview](wiki/Architecture-Overview.md)
2. **Know the package system** - [Package System](wiki/Architecture-Packages.md)
3. **Read the principles** - [Coding Philosophy](wiki/Coding-Philosophy.md)
4. **Check the submodule docs** - Module-specific CLAUDE.md and README.md

## Common Workflows

### Cross-Module Development ⚠️ CRITICAL

**Work on ONE module at a time.** Pause between switching modules to commit, push, and wait for package publishing.

**The dependency chain:**
```
db (schema) → api (types) → client
```

**Skeleton-first approach:** When building new features, create shell components, placeholder screens, and stub endpoints first. Validate routing and permissions work before full implementation.

### Making Changes to Database Schema

1. Edit `db/prisma/schema.prisma`
2. Run `bun push` in db module to apply locally
3. **Commit and push db submodule to `main`**
4. **Wait for `@archeusllc/schema` package to publish** (check GitHub Actions)
5. In api module: run `bun update` to get new schema
6. Make necessary code changes in api
7. Repeat publish cycle if api changes are needed by client

### Adding New API Endpoint

1. Create route in `api/src/routes/`
2. Add OpenAPI documentation
3. Run `bun generate` in api to update types
4. **Commit and push api submodule to `main`**
5. **Wait for `@archeusllc/types` package to publish** (check GitHub Actions)
6. In client module: run `bun update` to get new types

### Adding New Feature to Client

1. Check if API supports it (or add API endpoint first - see above)
2. Run `bun update` to ensure latest `@archeusllc/types`
3. Import types from `@archeusllc/types`
4. Use type-safe API calls with Eden Treaty
5. Follow [Lessons Learned - Frontend](wiki/lessons/Frontend.md) patterns

### Multi-Module Feature Development

For features spanning db → api → client:

1. **Phase 1: db module**
   - Make schema changes
   - `bun push` locally
   - Commit & push to main
   - Wait for schema package to publish

2. **Phase 2: api module**
   - `bun update` to get new schema
   - Create routes (can be stubs initially)
   - Commit & push to main
   - Wait for types package to publish

3. **Phase 3: client module**
   - `bun update` to get new types
   - Create screens/components
   - Wire up navigation and API calls

**Do NOT skip the wait steps.** Using stale types causes confusing errors.

### Deploying to Production

**Architecture:** Each submodule has its own GitHub Actions workflow triggered by pushing to the `deploy` branch.

**To deploy:**
1. Push changes to each submodule's `deploy` branch:
   ```bash
   cd api && git push origin HEAD:deploy
   cd client && git push origin HEAD:deploy
   cd db && git push origin HEAD:deploy
   cd cms-api && git push origin HEAD:deploy
   ```
2. Monitor workflows: `gh run list -R archeusllc/band-together-<module>`
3. Verify health endpoints after deployment

**Key lessons learned:**
- Workflows are in **submodule repos**, not the main orchestration repo
- Each submodule needs its own GitHub secrets configured
- The db module uses `prisma db push` (not migrations) with semver-based reset logic:
  - Minor version bump = `--force-reset` (drops all data)
  - Patch version = `--accept-data-loss` (preserves data when possible)
- The `deployed_version.txt` file tracks the last deployed version

**Required GitHub secrets per submodule:**
- `api/`, `cms-api/`: `FLY_API_TOKEN`, `GH_PKG_TOKEN`
- `client/`: `EXPO_TOKEN`, `GH_PKG_TOKEN`
- `db/`: `FLY_API_TOKEN`, `DB_PASSWORD`

**Health check endpoints:**
- API: https://band-together-staging.fly.dev/health
- CMS API: https://band-together-cms-staging.fly.dev/health

## Brainstorming Features

When the user wants to brainstorm a new feature, use the AskUserQuestion tool to ask:
**"Should we do this interview style, or idea dump style?"**

### Two Brainstorming Styles

**Interview Style:**
- AI agent asks structured questions about the feature
- Questions cover: problem statement, user needs, design philosophy alignment, technical approach, edge cases
- AI creates/updates brainstorm document as answers are collected
- Iterative conversation until design is fully explored

**Idea Dump Style:**
- User shares random, intermittent thoughts about the feature
- AI organizes these thoughts into a coherent brainstorm document
- AI identifies gaps and asks clarifying questions as needed
- AI continuously updates the brainstorm file as new ideas emerge

### Brainstorm Document Structure

Create/update file: `wiki/brainstorms/Brainstorm-Feature-Name.md`

Template:
```markdown
# [Feature Name] - Brainstorm

**Status**: Brainstorming
**Created**: YYYY-MM-DD
**Related Features**: [comma-separated list]
**Implementation Plan**: [Link to plan if exists, or "Not yet planned"]

---

## Problem Statement

[Clear description of the problem being addressed or opportunity being explored]

---

## Design Philosophy

[How this feature aligns with "Cool and Useful Without Install" and project principles]

---

## Proposed Solution

[Design exploration, ideas, trade-offs, architectural considerations]

---

## Open Questions

[Unresolved questions, areas needing investigation]

---

**Last Updated**: YYYY-MM-DD | **Status**: [Brainstorming/Ready for Planning/Implemented]
```

### Workflow

1. **Start brainstorm**: Ask which style (interview or idea dump)
2. **Create/update document**: Use brainstorm template in `wiki/brainstorms/`
3. **Evolve the design**: Update brainstorm as ideas develop
4. **Transition to planning**: When ready, create implementation plan referencing the brainstorm
5. **Update status**: Mark brainstorm as "Implemented" when feature is complete

**Brainstorm → Plan → Implement** progression:
- Brainstorms explore design space and capture ideas
- Plans detail implementation steps and reference brainstorms
- Implemented features update brainstorm status for historical record

## Questions?

- **Architecture & design:** [Architecture Overview](wiki/Architecture-Overview.md)
- **Package system:** [Package System](wiki/Architecture-Packages.md) ⚠️ CRITICAL
- **Code patterns:** [Coding Philosophy](wiki/Coding-Philosophy.md)
- **Git workflow:** [Git Workflow](wiki/Git-Workflow.md)
- **Module-specific:** Check module's CLAUDE.md
- **Setup instructions:** Check module's README.md
- **Technical lessons:** [Lessons Learned](wiki/lessons/)
- **Everything else:** [Wiki Home](wiki/Home.md)

---

**Last Updated:** 2026-01-26 | **Status:** Current and accurate | [Full Wiki](wiki/Home.md)
