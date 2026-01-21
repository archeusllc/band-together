# GitHub Copilot Instructions

AI coding assistant guide for Band Together - a band companion app for musicians, venues, and fans.

## Architecture

**Monorepo Structure**: Bun workspace with 4 packages:
- `api/` - REST API (Elysia framework, Firebase Auth)
- `client/` - React Native app (Expo, NativeWind, React Navigation)
- `db/` - PostgreSQL database (Prisma ORM, schema definitions)
- `shared/` - Shared types and Prisma client (generated from schema)

**Data Flow**: Client → Eden Treaty → API → Prisma → PostgreSQL. Types generated from Prisma schema are shared across all packages. API types auto-generated via `/server.d.ts` endpoint.

**Key Integration Points**:
- Prisma Client generated to `shared/generated/prisma-client/` (used by API)
- API types generated to `shared/generated/api-types/` (used by client via Eden Treaty)
- Firebase Admin SDK (API) + Firebase Client SDK (client) for authentication

## Critical Commands

```bash
# Database workflow (from db/)
bun push              # Push schema changes to database
bun start             # Open Prisma Studio

# API workflow (from api/)
bun start             # Start API with watch mode
bun generate          # Generate API types from running server

# Client (from client/)
bun start             # Start Expo dev server

# Docker services (from root)
docker-compose up -d  # Start PostgreSQL + Adminer
```

**Schema changes workflow**: Edit `db/prisma/schema.prisma` → `cd db && bun push` → API auto-restarts with new types.

## Package Manager

**ALWAYS use `bun`** - never npm. Examples: `bun install`, `bun add package`, `bun run script`.

## Client Conventions

**Imports - Path Aliases WITHOUT `@/` prefix**:
```typescript
// ✅ Correct
import { useAuth } from '@contexts'
import { HomeScreen } from '@screens'
import { tailwind, colors } from '@theme'

// ❌ Incorrect
import { useAuth } from '@/contexts'
import { useAuth } from '../contexts'
```

Never include file extensions (`.ts`, `.tsx`) in imports.

**Component Syntax - Arrow functions with direct export**:
```typescript
export const MyComponent = () => {
  return <View>Content</View>;
};
```

**Styling - NativeWind with centralized theme**:
```typescript
import { tailwind, colors } from '@theme';

<View className={`flex-1 ${tailwind.background.both}`}>
  <Text className={tailwind.text.both}>Hello</Text>
  <TextInput 
    className={`${tailwind.card.both} ${tailwind.border.both}`}
    placeholderTextColor={colors.light.muted}
  />
</View>
```

Use `@theme` instead of hardcoded Tailwind classes. Dark mode configured as `darkMode: 'media'` (automatic device detection). TextInput requires explicit text color class or will be invisible in dark mode.

**Navigation - Type-safe with RootStackParamList**:
```typescript
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
navigation.navigate('EventDetails', { eventId: '123' }); // Compile-time safe
```

## API Conventions

**Path Aliases** (same pattern as client):
```typescript
import { prisma } from '@services'
import { feedController } from '@controllers'
import { firebaseMiddleware, firebaseGate } from '@middleware'
```

**Controllers - Export named object with methods**:
```typescript
export const myController = {
  getItem: async (id: string) => { /* ... */ },
  createItem: async (data: CreateInput) => { /* ... */ },
};
```

**Routes - Elysia with OpenAPI documentation**:
```typescript
export const myRoutes = new Elysia().group('/items', (route) =>
  route
    .get('/:id', async ({ params: { id } }) => {
      return await myController.getItem(id);
    }, {
      detail: {
        tags: ['Items'],
        summary: 'Get item by ID',
        responses: {
          200: { description: 'Item found' },
          404: { description: 'Item not found' }
        }
      }
    })
)
```

Always include `detail` object with tags, summary, responses for auto-generated OpenAPI docs.

**Firebase Authentication - Two middleware patterns**:

1. **Optional auth** (`firebaseMiddleware`) - Routes work with or without token:
```typescript
.use(firebaseMiddleware)
.get('/feed', async ({ firebase }) => {
  const uid = firebase?.uid || null; // firebase may be undefined
  // Return personalized data if uid, public data otherwise
})
```

2. **Required auth** (`firebaseGate`) - Routes reject without token:
```typescript
.use(firebaseGate)
.get('/me', async ({ firebase }) => {
  // firebase.uid is guaranteed to exist
  return await authController.me(firebase.uid);
})
```

Both use `.derive({ as: 'scoped' })` to add `firebase` context to request.

## Eden Treaty Client Patterns

**Path parameters use bracket notation**:
```typescript
// ✅ Correct - path parameter
const { data } = await api.events[eventId].get()

// ❌ Incorrect - treats as query param
const { data } = await api.events({ eventId }).get()
```

**Bearer tokens with request bodies**:
```typescript
const token = await firebaseAuthService.getIdToken();
await api.acts.post({ 
  ...body, 
  $headers: { authorization: `Bearer ${token}` } 
});
```

Use `$headers` within the request object to properly merge headers with body.

## Design Philosophy

**"Cool and Useful Without Install"** - Features should work without login whenever possible. Authentication reserved for natural security boundaries (editing, creating). Web version has full functionality, not degraded experience.

**Implementation approach**:
- Favor brevity over complexity - minimum-viable solutions
- No premature abstractions - three similar lines better than unnecessary helper
- Break work into small phases touching ONE submodule at a time
- Read existing code before proposing modifications
- TypeScript strict mode - no `any` types

## Reference Files

- [CLAUDE.md](CLAUDE.md) - Full AI assistant guide with patterns and examples
- [wiki/AI-Context.md](wiki/AI-Context.md) - Comprehensive project context
- [db/prisma/schema.prisma](db/prisma/schema.prisma) - Database schema (source of truth)
- [client/src/theme/colors.ts](client/src/theme/colors.ts) - Theme color definitions
- [api/src/index.ts](api/src/index.ts) - API entry point with middleware setup
