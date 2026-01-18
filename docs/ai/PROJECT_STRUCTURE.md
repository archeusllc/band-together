# Band Together - Project Structure Overview

## Repository Root Layout

```
band-together/
├── docs/                           # Documentation
│   └── ai/                         # AI context & guidance files
│       ├── index.md
│       ├── STYLE_GUIDE.md
│       ├── CLIENT_GUIDE.md
│       ├── API_GUIDE.md
│       ├── SHARED_GUIDE.md
│       └── PROJECT_STRUCTURE.md
│
├── client/                         # React Native/Expo app
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── constants/             # Constants
│   │   ├── hooks/                 # Custom hooks
│   │   ├── navigation/            # Navigation configuration
│   │   ├── services/              # API & business logic
│   │   ├── assets/                # Images, fonts
│   │   ├── App.tsx                # Root component
│   │   └── types.d.ts
│   ├── tsconfig.json              # Path aliases configured
│   ├── package.json
│   └── app.json
│
├── api/                            # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── controllers/           # Route controllers
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── tsconfig.json              # Path aliases configured
│   └── package.json
│
├── shared/                         # Shared code (types, utilities)
│   ├── src/
│   │   ├── types/                 # Shared TypeScript types
│   │   └── index.ts
│   ├── tsconfig.json              # Path aliases configured
│   └── package.json
│
├── db/                             # Database configuration
│   ├── migrations/                # Database migrations
│   ├── seeds/                     # Database seeds
│   └── config/
│
├── .cursorrules                    # Cursor AI rules (project-level)
├── README.md                       # Project README
├── package.json                    # Root package (monorepo)
└── bun.lock                        # Bun lock file

```

## Submodules Overview

### Client (`/client`)
- **Purpose**: React Native mobile app and web version
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Key Dependencies**: React Navigation, React Native Reanimated, Expo modules
- **Target Platforms**: iOS, Android, Web
- **Path Aliases**: `@components`, `@hooks`, `@screens`, etc.
- **Guidance**: See [CLIENT_GUIDE.md](./CLIENT_GUIDE.md)

### API (`/api`)
- **Purpose**: Backend REST API
- **Framework**: Node.js/Express
- **Language**: TypeScript
- **Key Dependencies**: Express, TypeORM/Prisma, Authentication, Validation
- **Role**: Serves the mobile and web clients
- **Path Aliases**: `@routes`, `@controllers`, `@middleware`, `@services`, `@types`
- **Guidance**: See [API_GUIDE.md](./API_GUIDE.md)

### Shared (`/shared`)
- **Purpose**: Shared code between client and API
- **Contents**: Type definitions, constants, utilities
- **Language**: TypeScript
- **Used By**: Both client and API submodules
- **Path Aliases**: `@types`, `@/*`
- **Guidance**: See [SHARED_GUIDE.md](./SHARED_GUIDE.md)

### DB (`/db`)
- **Purpose**: Database schema, migrations, seeds
- **Contents**: Database configuration, migration files, seed data
- **Technology**: (SQL/ORM specific - check db/README.md)
- **Note**: Typically managed via ORM or migration tool

## Key Features

### Musicians
- Create and manage band profiles
- List upcoming performances
- Connect with venues and fans
- Share music content

### Venues
- List upcoming events
- Book musicians for performances
- Manage capacity and scheduling
- Communicate with bands and fans

### Fans
- Discover musicians and venues
- View upcoming performances
- Follow favorite musicians/venues
- Connect with the community

## Development Workflow

### Starting the Client
```bash
cd client
npm install  # or bun install
npm run dev  # Start Expo development server
```

### Starting the API
```bash
cd api
npm install  # or bun install
npm run dev  # Start development server
```

### Running Both
```bash
# Terminal 1
cd client && npm run dev

# Terminal 2
cd api && npm run dev
```

## Code Organization Philosophy

### Submodule Independence
- Each submodule is self-contained
- Shared code lives in `/shared`
- Submodules communicate via API
- Changes in one don't require changes in others

### Path Aliases
- Centralize imports to specific locations
- Reduce relative path complexity
- Improve code readability
- Enable easier refactoring

### Consistency Across Modules
- Arrow function syntax everywhere
- TypeScript strict mode
- Consistent import organization
- Similar folder structures

## TypeScript Configuration

All submodules have TypeScript configured with:
- ✅ Strict mode enabled
- ✅ Path aliases for clean imports
- ✅ Module resolution: bundler
- ✅ Target: ES2020

### Shared tsconfig Settings
```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Module-Specific Aliases
See the guide for each module:
- **Client**: [CLIENT_GUIDE.md](./CLIENT_GUIDE.md#path-aliases)
- **API**: [API_GUIDE.md](./API_GUIDE.md)
- **Shared**: [SHARED_GUIDE.md](./SHARED_GUIDE.md)

## Communication Between Modules

### Client ↔ API
- REST API over HTTP/HTTPS
- JSON request/response format
- Shared types from `/shared` for request/response structures

### Client ↔ Shared
- Direct TypeScript imports
- Shared type definitions
- Constants and utilities

### API ↔ Shared
- Direct TypeScript imports
- Shared type definitions
- Database models and schemas

## Environment Configuration

### Client Environment Variables
```bash
# .env files in client/
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_API_VERSION=v1
```

### API Environment Variables
```bash
# .env file in api/
PORT=3000
DATABASE_URL=...
JWT_SECRET=...
NODE_ENV=development
```

## Database Architecture

The `db/` folder contains:
- Schema definitions
- Migration files
- Seed data
- Connection configuration

Used by both client and API as needed.

## Deployment Structure

```
Production Environment:
├── Client
│   ├── iOS App (App Store)
│   ├── Android App (Google Play)
│   └── Web (Static hosting)
│
├── API
│   └── REST API Server
│
└── Database
    └── Postgres/MySQL (production)
```

## Common Development Tasks

### Adding a New Feature
1. Define types in `/shared/types`
2. Create API endpoint in `/api/routes`
3. Create client screen in `/client/src/screens`
4. Update navigation if needed

### Modifying Shared Types
1. Edit types in `/shared/src/types`
2. Update both client and API to use new types
3. Run tests in both modules

### Deploying Changes
1. Test locally (client + API)
2. Build for deployment
3. Run migrations if needed
4. Deploy API first, then client

## Resources

- **Project Wiki**: https://github.com/archeusllc/band-together/wiki
- **Setup Instructions**: See individual module README files
- **API Documentation**: See `/api/README.md`
- **Client Documentation**: See `/client/README.md`
- **Database Setup**: See `/db/README.md`

---

**Last Updated**: 2026-01-18
**Project**: Band Together - Musicians, Venues, & Fans Platform
