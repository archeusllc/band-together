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

## Setup

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/archeusllc/band-together.git

# Or init submodules after clone
git submodule update --init --recursive
```

## Development

See individual submodule READMEs for setup instructions.
