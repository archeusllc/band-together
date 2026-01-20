# CLAUDE.md - AI Assistant Guide

Welcome! This file provides quick guidance for AI assistants working on Band Together.

## Quick Start

For comprehensive project context, see the **[AI Context Guide](wiki/AI-Context.md)** in the wiki submodule. It covers:
- Project structure and tech stack
- Path aliases and import conventions
- Component patterns and architecture
- Development workflow
- Coding standards

## Key Preferences

When working on Band Together, please follow these conventions:

### Package Management
- **Use `bun` for all commands** - never use npm
- Examples: `bun install`, `bun add package`, `bun run [script]`

### React Native Client

**Component Syntax**
- Use arrow functions for all component exports (except screen default exports)
- ```typescript
  export const MyComponent = () => {
    return <View>Content</View>;
  };
  ```

**Import Style**
- Use path aliases without `@/` prefix
- ```typescript
  // ✅ Correct
  import { useAuth } from '@contexts'
  import { HomeScreen } from '@screens'
  import { IconSymbol } from '@components/ui'

  // ❌ Incorrect
  import { useAuth } from '@/contexts'
  import { HomeScreen } from './screens'
  import { HomeScreen } from '@/navigation/screens/Home.tsx'
  ```
- Never include file extensions (`.ts`, `.tsx`, `.js`) in imports

**Code Quality**
- Favor brevity and simplicity over complexity
- Implement minimum-viable solutions - avoid over-engineering
- Follow DRY (Don't Repeat Yourself) principles
- Add comments only when logic isn't self-evident
- Use TypeScript strict mode rigorously

### API Layer (api/)

**Endpoint Development**
- Use Elysia framework patterns (controllers, services, middleware)
- Always include OpenAPI documentation for new endpoints using JSDoc comments
- Export route handlers as named functions with proper types
- Place route definitions in `@routes`, handlers in `@controllers`

**OpenAPI Documentation**
- Add JSDoc comments to all endpoint handlers with `@summary`, `@description`, `@param`, `@returns` tags
- Keep endpoint documentation in sync with implementation changes
- Example:
  ```typescript
  /**
   * @summary Get user's activity feed
   * @description Returns personalized feed of calendar events from followed entities
   * @param {string} userId - User ID
   * @returns {CalendarEvent[]} Array of events sorted by startTime
   */
  export const getFeed = async (userId: string) => { /* ... */ }
  ```

### Planning & Execution

- **Keep plans focused and small in scope** - prefer incremental changes
- **Read existing code before proposing modifications** - understand patterns first
- **Ask clarifying questions** when requirements are ambiguous
- **Avoid premature abstractions** - three similar lines is better than an unnecessary helper

## Project Essentials

| Aspect | Details |
|--------|---------|
| **Runtime** | Bun (all packages) |
| **Language** | TypeScript (strict mode) |
| **Client** | React Native + Expo + NativeWind |
| **API** | Elysia framework |
| **Database** | PostgreSQL + Prisma |
| **State** | React Context API |
| **Styling** | Tailwind CSS via NativeWind |

## Development Commands

### Root Commands
```bash
# Installation (runs preinstall to set up all workspaces)
bun install
```

### Database Commands (from `db/` directory)
```bash
cd db

bun start                 # Open Prisma Studio
bun push                  # Push schema changes to database
bun generate             # Generate Prisma client
bun clean                # Clean node_modules and lock files
bun reset                # Clean and reinstall dependencies
```

### API Commands (from `api/` directory)
```bash
cd api

bun start                # Start API server with watch mode
bun generate             # Generate API types from running server
bun clean                # Clean node_modules and lock files
bun reset                # Clean and reinstall dependencies
```

### Local Database Setup
```bash
# Start PostgreSQL + Adminer (from project root)
docker-compose up -d

# Apply schema and manage database
cd db && bun push        # Apply schema migrations
cd db && bun start       # Open Prisma Studio for visual management
```

## Path Aliases

### Client (`client/src/`)
- `@components` / `@components/*` - Reusable UI components
- `@ui` / `@ui/*` - UI primitives
- `@screens` / `@screens/*` - Screen components
- `@navigation` - Navigation config
- `@hooks` - Custom hooks
- `@contexts` - React contexts
- `@services` - API & business logic
- `@constants` - App constants
- `@assets/*` - Images, fonts

### API (`api/src/`)
- `@routes` - Route definitions
- `@controllers` - Route handlers
- `@middleware` - Auth & validation
- `@services` - Business logic
- `@types` - Type definitions

## File Organization

```
band-together/
├── client/        # React Native app
├── api/           # REST API (Elysia)
├── shared/        # Shared types & utilities
├── db/            # Database & Prisma config
└── wiki/          # GitHub wiki (git submodule)
    └── AI-Context.md  # Full project context
```

## Submodule Definition

For planning and task organization purposes, a **submodule** is any directory exactly one level deeper from the project root:
- `api/` - Backend API layer
- `client/` - React Native client app
- `db/` - Database & Prisma configuration
- `shared/` - Shared types and utilities
- `wiki/` - Documentation and context

Tasks should be scoped to work within a single submodule when possible, keeping changes focused and independent.

## Key Standards

1. **Arrow functions** - Use for all component/function exports (except screen defaults)
2. **Alias imports** - No relative paths, no `@/` prefix
3. **No file extensions** - Skip `.ts`, `.tsx`, `.js` in imports
4. **Barrel exports** - Each major directory has `index.ts`
5. **TypeScript strict** - No `any` type, strict mode enforced
6. **Context API** - Global state via React Context (no Redux/Zustand)
7. **NativeWind** - Tailwind CSS via `className` prop (no StyleSheet.create)
8. **Services layer** - Abstract API & Firebase into service files
9. **Dark mode** - Always prefer Tailwind `dark:` variants over React Navigation theme colors for component styling (see Theming section below)

## Theming & Dark Mode

### Overview
The app implements automatic device-based dark mode using NativeWind v4 with `darkMode: 'media'`. This automatically responds to the device's system color scheme preference without any manual context or state management.

### Key Files
- **[client/tailwind.config.js](client/tailwind.config.js)** - Configured with `darkMode: 'media'` to enable automatic detection
- **[client/src/theme/colors.ts](client/src/theme/colors.ts)** - **Single source of truth** for all theme colors and Tailwind classnames
- **[client/src/theme/index.ts](client/src/theme/index.ts)** - Barrel export for clean imports via `@theme`
- **[client/src/navigation/themes.ts](client/src/navigation/themes.ts)** - React Navigation theme objects (headers/drawer)

### Color & Classname System
The `@theme` module exports three objects:

```typescript
// Hex color values for all light/dark mode colors
export const colors = {
  light: { background: '#F1F5F9', card: '#FFFFFF', text: '#000000', ... },
  dark: { background: '#0F172A', card: '#1E293B', text: '#FFFFFF', ... },
  brand: { primary: '#3B82F6', success: '#10B981', error: '#FF3B30', ... },
};

// Pre-built Tailwind classname combinations for common patterns
export const tailwind = {
  background: { light: 'bg-slate-100', dark: 'dark:bg-slate-900', both: 'bg-slate-100 dark:bg-slate-900' },
  card: { light: 'bg-white', dark: 'dark:bg-slate-800', both: 'bg-white dark:bg-slate-800' },
  text: { light: 'text-black', dark: 'dark:text-white', both: 'text-black dark:text-white' },
  textMuted: { light: 'text-gray-600', dark: 'dark:text-gray-400', both: 'text-gray-600 dark:text-gray-400' },
  border: { light: 'border-slate-200', dark: 'dark:border-slate-700', both: 'border-slate-200 dark:border-slate-700' },
  activeBackground: { light: 'bg-slate-100', dark: 'dark:bg-slate-700', both: 'bg-slate-100 dark:bg-slate-700' },
  primary: 'text-blue-500',
  error: 'text-red-600',
  errorDark: 'dark:text-red-500',
};

// React Navigation theme color mappings
export const navigationColors = {
  light: { primary: '#3B82F6', background: '#F1F5F9', card: '#FFFFFF', text: '#000000', ... },
  dark: { primary: '#3B82F6', background: '#0F172A', card: '#1E293B', text: '#FFFFFF', ... },
};
```

### Usage in Components
Always use the centralized theme instead of hardcoding classnames:

```typescript
// ✅ Correct - Uses centralized theme
import { tailwind, colors } from '@theme';

<View className={`flex-1 ${tailwind.background.both}`}>
  <Text className={`text-base ${tailwind.text.both}`}>Hello</Text>
  <TextInput
    className={`border ${tailwind.border.both} ${tailwind.card.both}`}
    placeholderTextColor={colors.light.muted}
  />
</View>

// ❌ Incorrect - Hardcoded classes
<View className="flex-1 bg-slate-100 dark:bg-slate-900">
  <Text className="text-base text-black dark:text-white">Hello</Text>
  <TextInput className="border border-slate-200 dark:border-slate-700 ..." />
</View>
```

### Color Mappings
| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page background | `bg-slate-100` | `dark:bg-slate-900` |
| Card background | `bg-white` | `dark:bg-slate-800` |
| Primary text | `text-black` | `dark:text-white` |
| Muted text | `text-gray-600` | `dark:text-gray-400` |
| Borders | `border-slate-200` | `dark:border-slate-700` |
| Active/highlight | `bg-slate-100` | `dark:bg-slate-700` |

### Important Notes
- TextInput requires explicit `text-black dark:text-white` class or text will be invisible in dark mode
- Use `placeholderTextColor={colors.light.muted}` for consistent placeholder styling
- Headers and drawer automatically follow device theme via React Navigation themes
- No app restart needed for theme changes in most cases, but may be required after initial app launch

## Common Patterns

**Custom Hook**
```typescript
export const useCustomLogic = () => {
  const [state, setState] = useState(null);
  // Logic here
  return { state, setState };
};
```

**Context Setup**
```typescript
const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }) => (
  <MyContext.Provider value={...}>{children}</MyContext.Provider>
);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
};
```

**Service Pattern**
```typescript
export const myService = {
  fetchData: async () => { /* ... */ },
  processData: (data) => { /* ... */ },
};
```

## Activity Feed Implementation - Lessons Learned

### Overview
Phases 1-4 of the Activity Feed feature are complete. Key learnings for future feature development:

### Navigation & Type Safety

**Type-Safe Navigation with RootStackParamList**
- Define all screens and their params in a centralized `RootStackParamList` type
- Use `useNavigation<NavigationProp>()` with proper generic typing for compile-time safety
- Screen components receive props via `NativeStackScreenProps<RootStackParamList, 'ScreenName'>`
- This pattern catches route name and param typos at compile time rather than runtime

Example:
```typescript
// navigation/types.ts
export type RootStackParamList = {
  EventDetails: { eventId: string };
  Login: undefined;
};

// In component
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
navigation.navigate('EventDetails', { eventId: '123' }); // Type-safe
```

**Static Navigation Configuration**
- Use static navigation config with `createNativeStackNavigator()` and `createDrawerNavigator()`
- Register all screens upfront in the navigator configuration
- Screens remain as default exports for ease of registration
- Drawer + Stack composition works well for main app (drawer) and modal flows (stack)

### API Client Patterns

**Eden Treaty Path Parameters with Bracket Notation**
- **CRITICAL**: Use bracket notation for dynamic segments: `api.resource[id].get()` not `api.resource({ id }).get()`
- Bracket notation properly interpolates path parameters into URLs
- Object notation treats values as query/body parameters (incorrect for path params)
- This was a critical bug fix in Phase 4: `api.events({ eventId })` → `api.events[eventId]`

Example:
```typescript
// ✅ Correct - path parameter
const { data } = await api.events[eventId].get()

// ❌ Incorrect - treats as query param
const { data } = await api.events({ eventId }).get()
```

**Bearer Token Transmission**
- When sending Bearer tokens with request bodies (POST/PATCH), merge headers into the request object using `$headers`
- Example: `api.acts.post({ ...body, $headers: { authorization: `Bearer ${token}` } })`
- Headers passed as separate arguments don't properly merge with request body in Eden Treaty client

**Public Endpoints with Optional Authentication**
- Use `firebaseUid || null` pattern to support both authenticated and unauthenticated access
- Service layer catches auth errors and returns null as fallback
- API endpoints can check `if (firebaseUid || null)` to provide personalized data when authenticated
- This pattern allows graceful degradation: unauthenticated users get public data, authenticated users get personalized data

### API Middleware Patterns (Elysia)

**Middleware Scope and Guards**
- Middleware in Elysia must be applied **within the same route callback scope** - guards apply to all routes defined **after** them
- Middleware does NOT propagate across separate Elysia instances when composed with `.use()`
- This causes 401 errors when separate public/authenticated route groups are composed

**Correct Pattern for Mixed Authentication**:
```typescript
export const actsRoutes = new Elysia()
  .use(optionalFirebaseAuthMiddleware)           // Top-level for optional auth
  .group('/acts', (route) =>
    route
      // Public routes come first
      .get('/', handler)                          // Uses optionalFirebaseAuthMiddleware
      .get('/:id', handler)                       // Uses optionalFirebaseAuthMiddleware
      // Middleware applied HERE - all routes after get firebaseAuthMiddleware
      .use(firebaseAuthMiddleware)
      // Protected routes after middleware
      .post('/', async ({ firebaseUid, ... }) => {})   // ✅ firebaseUid injected
      .patch('/:id', async ({ firebaseUid, ... }) => {})
      .delete('/:id', async ({ firebaseUid, ... }) => {})
  );
```

**Incorrect Pattern to Avoid**:
```typescript
// ❌ WRONG - Middleware doesn't propagate across instances
const publicRoutes = new Elysia()
  .use(optionalFirebaseAuthMiddleware)
  .group('/acts', (route) => route.get(...));

const authRoutes = new Elysia()
  .use(firebaseAuthMiddleware)
  .group('/acts', (route) => route.post(...));

// This composition doesn't work - firebaseUid undefined in POST handler
export const routes = new Elysia()
  .use(publicRoutes)
  .use(authRoutes);
```

**Key Insight**: Guards/middleware must be declared and applied in sequence within the same builder chain to properly scope to the routes that follow them.

### State Management

**Local State vs Global Context**
- For simple, screen-scoped state (like follow status in EventDetails), use local `useState`
- Only promote to Context when state needs to be shared across multiple screens
- Follow state in EventDetails is intentionally local: updates immediately but doesn't require feed refresh
- Future enhancement: Move to Context when multiple screens need synchronized follow state

**Set Data Structure for Multi-Item State**
- Use `Set<string>` for tracking which items are in a particular state across a collection
- Example: `followingActs = Set<string>` where strings are act IDs
- Faster lookup with `.has()` than array filtering
- Immutable updates: `new Set(prev).add(id)` when spreading state

### Component Patterns

**Separation of Concerns in Screens**
- Data fetching: `useEffect` on screen mount, separate async functions
- Business logic: Handlers like `handleFollowVenue()`, `handleFollowAct()` kept together
- Rendering: Separate views for loading, error, empty, and content states
- This structure makes screens maintainable even at 300+ lines

**Follow State Checking Pattern**
- After fetching main data, check follow status only if authenticated
- Use `data.follows.some(f => f.entityType === 'GUILD' && f.guildId === targetId)` to find matches
- This pattern works for both venues and acts with the same comparison logic

### API Endpoint Design

**Public Endpoints with Guild Relations**
- When an endpoint needs to support follow features, include guild relations in response
- Include relations eagerly: `include: { guild: true }` in Prisma queries
- This prevents N+1 queries and provides all data needed for follow status checking
- Single endpoint can serve both authenticated and unauthenticated users

**OpenAPI Documentation**
- Always include `detail` object in Elysia route definitions with tags, summary, description
- Document response codes: 200 for success, 404 for not found, 401 for unauthorized, 500 for errors
- This auto-generates Swagger docs and helps API consumers understand behavior

### Dark Mode Integration

**Use Centralized Theme for All Components**
- Import `{ tailwind, colors }` from `@theme` instead of hardcoding Tailwind classes
- Always use `.both` variants for dual light/dark mode support: `${tailwind.background.both}`
- The centralized theme makes it trivial to update color scheme globally
- All components automatically inherit new colors when theme is updated

### Error Handling

**User-Facing Error Messages**
- Catch API errors and display human-readable messages to users
- Show loading indicators (spinners) while operations are in progress
- Disable buttons during loading to prevent duplicate requests
- This pattern: loading → success/error → user action flow

### Commits & Documentation

**Incremental Commits**
- Phase 4 was split into 2 commits: initial implementation + critical bug fix
- Each commit should represent a working state (even if buggy features are still present)
- Bug fix commits should clearly reference the issue: "Fix API call for getting event by ID"
- Commit messages help future developers understand "why" not just "what"

### What Worked Well

1. **Type-safe navigation** - Caught bugs early and enabled confident refactoring
2. **Service layer abstraction** - `feedService` kept API details away from components
3. **NativeWind styling** - Dark mode support with minimal extra code
4. **Incremental phases** - Breaking work into digestible chunks made it manageable
5. **Local state for follow tracking** - Simple and sufficient for Phase 4

### Areas for Improvement (Phase 5+)

1. **Global follow state** - Share follow updates across multiple screens
2. **Feed refresh on follow changes** - Currently requires manual feed refresh
3. **Optimistic updates** - Update UI immediately, roll back on error
4. **Error retry logic** - Graceful retry mechanism for transient failures
5. **Loading states per action** - Different loading states for different operations (follow vs unfollow)

---

**Last Updated**: 2026-01-20

**Recent Changes**:
- Completed Guild CRUD MVP with type-specific endpoints (/acts, /venues, /clubs)
- Fixed critical Elysia middleware scope bug - guards must be applied within route callback, not across instances
- Documented middleware patterns and Bearer token transmission for future development
- Fixed client service to properly send Authorization headers with request bodies
- Added API middleware pattern documentation to prevent future 401 authorization errors

Happy coding! 🎵
