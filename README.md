# Band Together

A band companion app for scheduling, setlists, and gig booking.

## Documentation

See the [Wiki](../../wiki) for full documentation.

## Structure

This repo uses git submodules:

| Submodule | Description |
|-----------|-------------|
| `client/` | Expo app (mobile + web) |
| `api/` | Bun/Elysia backend |
| `db/` | Prisma schema + migrations |

## Quick Start

### Using Make (recommended)

```bash
# Initialize submodules and install all dependencies
make install

# Update submodules to latest
make pull-submodules

# View available commands
make help
```

### Using npm/bun scripts

```bash
# Initialize submodules
npm run submodules

# Pull latest changes from all submodules
npm run pull-submodules

# Install all dependencies
npm run install-all

# View submodule status
npm run status
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
- [client/README.md](client/README.md) — Expo app
- [api/README.md](api/README.md) — Bun/Elysia API
- [db/README.md](db/README.md) — Prisma schema
