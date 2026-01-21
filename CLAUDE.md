# CLAUDE.md - AI Assistant Guide

Welcome! This file provides quick guidance for AI assistants working on Band Together.

## Quick Start

For comprehensive project context, see the **[AI Context Guide](wiki/AI-Context.md)** in the wiki submodule. It covers:
- Project structure and tech stack
- Path aliases and import conventions
- Component patterns and architecture
- Development workflow
- Coding standards

## Design Philosophy

**"Cool and Useful Without Install"**

Band Together is designed to be fully functional for users who access it via web browser, without requiring app installation or account registration. This philosophy applies to the entire application:

- **No Feature Walls** - Features should work without login whenever possible; authentication should be reserved for natural security boundaries (editing, creating content)
- **Web-First Functionality** - Web version should have full real-time capabilities, not be a degraded experience
- **Organic Adoption** - Demonstrate value before asking for signup; avoid "nag screens" or forced registrations
- **Natural Security** - Editing and content creation require authentication as a security measure, not an engagement tactic

This approach creates viral sharing opportunities and reduces friction for new users while maintaining security and data integrity.

## Key Preferences

When working on Band Together, please follow these conventions:

### Package Management
- **Use `bun` for all commands** - never use npm
- Examples: `bun install`, `bun add package`, `bun run [script]`

### React Native Client

**Component Syntax**
- Use arrow functions for all component exports, including screen components
- Export directly with `export const` pattern
- ```typescript
  export const MyComponent = () => {
    return <View>Content</View>;
  };

  export const HomeScreen = () => {
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
- **Implementation plan phases** - When creating implementation plans, use many small phases instead of few large ones:
  - Each phase should touch only ONE submodule (api, db, client) at a time
  - Each phase should focus on ONE feature/entity at a time
  - Build dependencies sequentially (e.g., SetItem models → SetItem endpoints → SetItem UI → SetList models → SetList endpoints → SetList UI)
  - Prefer 6 small focused phases over 3 large multi-entity phases

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

### Firebase Authentication Pattern (Elysia)

**Two-Tier Authentication System**

The API uses two Firebase authentication middleware layers with different purposes:

1. **`firebaseMiddleware`** - Optional authentication for endpoints that can work with or without auth
2. **`firebaseGate`** - Required authentication that rejects requests without valid tokens

**Optional Authentication (`firebaseMiddleware`)**

Use this for endpoints that may receive authentication but don't require it:

```typescript
// api/src/middleware/firebase.middleware.ts
export const firebaseMiddleware = new Elysia({
  name: 'firebase'
})
  .derive({
    as: 'scoped'
  }, async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return;
    const decoded = await firebaseAuth.verifyIdToken(authHeader.substring(7))

    return {
      firebase: {
        uid: decoded.uid,
        email: decoded.email,
      }
    }
  })
```

Key characteristics:
- Returns early if no Bearer token is present (no error thrown)
- Makes `firebase` context object available when token is valid
- `firebase` will be `undefined` if no token was provided
- Allows endpoints to provide personalized data when authenticated, public data otherwise

**Required Authentication (`firebaseGate`)**

Use this for endpoints that must have valid Firebase authentication:

```typescript
// api/src/middleware/firebase.middleware.ts
export const firebaseGate = new Elysia()
  .use(firebaseMiddleware)
  .derive({
    as: 'scoped'
  }, async ({ firebase }) => {
    if (!firebase) {
      throw new Error('Unauthorized: No valid Firebase token provided');
    }
    return { firebase }
  })
```

Key characteristics:
- Builds on top of `firebaseMiddleware`
- Throws error if `firebase` context is undefined
- Guarantees `firebase.uid` and `firebase.email` are present in handlers
- Request fails with 401 before handler executes if token is missing/invalid

**Usage Example - Mixed Public and Protected Routes**:

```typescript
// api/src/routes/auth.routes.ts
export const authRoutes = new Elysia().group('/auth', (authRoute) =>
  authRoute
    // Public routes (no authentication middleware)
    .post('/register', async ({ body, set }) => { /* ... */ })
    .post('/login', async ({ body, set }) => { /* ... */ })
    .post('/reset', async ({ body }) => { /* ... */ })

    // Protected routes (require valid Firebase token)
    .use(firebaseGate)
    .get(
      '/me',
      async ({ firebase }) => {
        // firebase.uid is guaranteed to be present here
        return await authController.me(firebase.uid);
      },
      {
        detail: {
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Current user profile retrieved' },
            401: { description: 'Unauthorized - missing or invalid Firebase token' }
          }
        }
      }
    )
)
```

**Key Points**:
- `.derive({ as: 'scoped' })` makes the returned object available in request context
- Middleware placement within `.group()` callback determines which routes it applies to
- Routes defined before `.use(firebaseGate)` are public
- Routes defined after `.use(firebaseGate)` require authentication
- This pattern allows mixing public and protected routes in the same file
- Always document protected endpoints with `security: [{ bearerAuth: [] }]` in OpenAPI detail

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
- Implemented Firebase authentication using Elysia `.derive({ as: 'scoped' })` pattern
- Documented correct Firebase authentication middleware pattern with scoped context extension
- Fixed Bearer token transmission in client service with proper `$headers` handling
- Clarified that authentication middleware is optional - only applies to routes that use it

**Key Learning**: The correct Elysia pattern for Firebase authentication is using `.derive({ as: 'scoped' })` to create a reusable middleware that makes a `firebase` context object available to routes that opt-in via `.use(firebaseMiddleware)`. This is cleaner and more composable than trying to mix public/private routes with sequential guards.

Happy coding! 🎵
