# Repo Structure

Git submodules for swappable components.

## Repositories

| Repo | Description | Visibility |
|------|-------------|------------|
| `archeusllc/band-together-wiki` | Documentation (this wiki) | Public |
| `archeusllc/bt-client` | Expo app (mobile + web) | Private |
| `archeusllc/bt-api` | Bun/Elysia backend | Private |
| `archeusllc/bt-db` | Prisma schema + migrations | Private |

## Monorepo Alternative

If submodules become cumbersome:

```
band-together/
├── apps/
│   └── client/
├── packages/
│   ├── api/
│   └── db/
└── package.json
```

## Rationale

Submodules allow:
- Independent prototyping per layer
- Easy abandonment of failed approaches
- Mixing public/private repos
