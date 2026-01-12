# Band Together

A band companion app for scheduling, setlists, and gig booking.

## Documentation

See the [Wiki](https://github.com/archeusllc/band-together/wiki) for full documentation.

## Structure

This repo uses git submodules:

| Submodule | Repository |
|-----------|------------|
| `client/` | [archeusllc/bt-client](https://github.com/archeusllc/bt-client) — Expo React Native app |
| `api/` | [archeusllc/bt-api](https://github.com/archeusllc/bt-api) — Bun/Elysia backend |
| `db/` | [archeusllc/bt-db](https://github.com/archeusllc/bt-db) — Prisma schema + migrations |

## Quick Start

### Using Make (recommended)

```bash
# Initialize submodules and install all dependencies
make install

# Sync all changes (stage, commit, push)
make sync-all

# Or individual commands:
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
# Initialize submodules
bun submodules

# Sync all changes in one command
bun sync-all

# Or individual commands:
bun pull-all            # Pull latest from all submodules
bun stage-all           # Stage all changes
bun commit-all          # Commit (auto-generates message)
bun push-all            # Push all repos
bun check               # Check for uncommitted changes

# Install all dependencies
bun install-all
```

### Manual setup

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/archeusllc/band-together.git

# Or init submodules after clone
git submodule update --init --recursive
```

## Development

See individual submodule READMEs for specific setup:
- [bt-client README](https://github.com/archeusllc/bt-client#readme) — Expo app setup and development
- [bt-api README](https://github.com/archeusllc/bt-api#readme) — API server and endpoints
- [bt-db README](https://github.com/archeusllc/bt-db#readme) — Database schema and migrations

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
