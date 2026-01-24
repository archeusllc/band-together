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
- **Prefer named exports over default exports** for better refactoring and IDE support

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

**Buttons and Icons**
- The app uses `@expo/vector-icons` (Ionicons) for all icons, which render on web, iOS, and Android
- Icon-only buttons are now fully supported since Ionicons work universally via font-based rendering
- `IconSymbol` wrapper component handles Ionicons rendering with proper TypeScript typing
- Icon names use Ionicons naming convention: common names like `pencil`, `trash`, `plus`, `close`, `search`, `link`, `checkmark`
- Pattern: `<IconSymbol name="pencil" size={24} color={colors.brand.primary} />`
- For accessibility, consider adding text labels on action buttons in dense layouts, but icon-only buttons are acceptable since icons render everywhere
- **Icon Library Migration Notes**:
  - Migrated from `expo-symbols` (SF Symbols, iOS-only) to `@expo/vector-icons` (Ionicons, universal)
  - @expo/vector-icons uses font-based rendering which works on web via CSS font files
  - Ionicons provides 1300+ icons with consistent visual style across platforms
  - TypeScript icon typing: `name: keyof typeof Ionicons.glyphMap` ensures valid icon names at compile time

**Dialogs and Alerts**
- **Do NOT use `Alert.alert()`** - React Native's native Alert component does not work on web
- Use the `AlertModal` component from `@components/ui` for all alerts and confirmation dialogs
- `AlertModal` provides consistent styling, dark mode support, and works on all platforms (web, iOS, Android)

**AlertModal Component API**:
```typescript
interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
}

<AlertModal
  visible={alertConfig.visible}
  title="Confirm Delete"
  message="This action cannot be undone."
  buttons={[
    { text: 'Cancel', style: 'cancel', onPress: () => setAlertConfig(...) },
    { text: 'Delete', style: 'destructive', onPress: handleDelete },
  ]}
/>
```

**State Management Pattern**:
Use a `alertConfig` state object in your component to manage alert visibility, content, and custom buttons:
```typescript
const [alertConfig, setAlertConfig] = useState<{
  visible: boolean;
  title: string;
  message: string;
  buttons?: AlertButton[];
}>({ visible: false, title: '', message: '' });

// Simple alert
setAlertConfig({
  visible: true,
  title: 'Error',
  message: 'Failed to save changes',
});

// Alert with custom callback
setAlertConfig({
  visible: true,
  title: 'Success',
  message: 'Saved successfully!',
  buttons: [{ text: 'OK', onPress: () => navigation.navigate('Home') }],
});

// Delete confirmation with destructive action
const handleDelete = async () => {
  try {
    await deleteItem(itemId);
    setAlertConfig({
      visible: true,
      title: 'Success',
      message: 'Deleted successfully',
    });
  } catch (error) {
    setAlertConfig({
      visible: true,
      title: 'Error',
      message: 'Failed to delete',
    });
  }
};

setAlertConfig({
  visible: true,
  title: 'Delete Item',
  message: 'Are you sure? This cannot be undone.',
  buttons: [
    { text: 'Cancel', style: 'cancel', onPress: () => setAlertConfig({ visible: false, ... }) },
    { text: 'Delete', style: 'destructive', onPress: handleDelete },
  ],
});
```

**Key Features**:
- Button styles: `'default'` (blue), `'cancel'` (gray), `'destructive'` (red)
- Dark mode support via Tailwind theming
- Proper web click handling with `pointerEvents` attributes
- Overlay dismissal by tapping outside modal (when no buttons provided)
- Icons in modals use Ionicons (which work on web)

### API Layer (api/)

**Route Organization - Subdirectory Pattern**

Each route group must follow this structure in `api/src/routes/<name>/`:
```
routes/auth/
├── index.ts                 # Barrel export: export { authRoutes }
├── auth.routes.ts           # Route definitions with Elysia
├── auth.controller.ts       # Business logic
├── auth.service.ts          # Data access layer (Prisma)
└── auth.test.ts             # Test suite (REQUIRED)
```

All routes must:
1. **Create a dedicated subdirectory** with co-located files
2. **Export controller/service locally** - use `from './auth.controller'` not `@controllers`
3. **Include test file** - `<name>.test.ts` with comprehensive coverage
4. **Create barrel export** - `index.ts` exporting only the routes

**Endpoint Development**
- Use Elysia framework patterns with layered architecture (routes → controller → service)
- Always include OpenAPI documentation for new endpoints using JSDoc comments
- Service layer handles all Prisma operations
- Controller handles business logic and validation
- Routes handle HTTP concerns and middleware

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

**Testing Requirements**
- Every route MUST have comprehensive tests in `<name>.test.ts`
- Use Bun test framework (`describe`, `test`, `expect`, `mock`)
- Coverage must include:
  - Happy path (successful requests)
  - Authentication (protected endpoints reject unauthorized)
  - Validation (invalid input returns 422)
  - Not found (non-existent resources return 404)
  - Edge cases (duplicate data, authorization failures)
- Tests are in global preload `api/src/test/index.ts` with Firebase mocks
- Run with: `bun run test` (not `bun test` - uses package.json script)

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

### Type System & Prisma

**Prisma Schema is the Single Source of Truth**

Never manually define base model types - Prisma auto-generates types from the schema that are always in sync.

**Correct Pattern:**
```typescript
// shared/index.ts - Export Prisma-generated types
export type {
  User, Guild, Track, CalendarEvent,  // Base models
} from './generated/prisma-client/index.js';

export {
  GuildType, TrackType, SharePermission,  // Enums (as values)
} from './generated/prisma-client/index.js';

// Also export custom DTOs from manual types
export * from './types/index';
```

**What to Keep in shared/types/:**
- Custom DTOs: `CreateInput`, `UpdateInput`, `SearchResult`
- Extended types: `WithDetails`, `WithRelations`
- Business logic types not in schema
- **Never** redefine base models (User, Guild, etc.)

**Schema Change Workflow:**
```bash
# 1. Edit schema
vim db/prisma/schema.prisma

# 2. Push to database (auto-regenerates types)
cd db && bun push

# 3. Types updated everywhere - zero manual sync!
```

**Benefits:**
- ✅ Schema changes instantly reflected in TypeScript
- ✅ No manual type maintenance or drift
- ✅ Compile-time errors if using wrong field names
- ✅ Enums work as both types and runtime values

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

**CRITICAL**: After running `bun push` or `bun generate` in db/, you MUST reinstall the shared module in client and api:
```bash
cd ../client && bun install
cd ../api && bun install
```

### API Commands (from `api/` directory)
```bash
cd api

bun start                # Start API server with watch mode
bun generate             # Generate API types from running server
bun clean                # Clean node_modules and lock files
bun reset                # Clean and reinstall dependencies
```

**CRITICAL**: After running `bun generate` in api/, you MUST reinstall the shared module in client and api:
```bash
cd ../client && bun install
cd ../api && bun install
```

### Shared Module Workflow

After ANY changes to files in `shared/` (especially generated types), you must reinstall the shared module in dependent workspaces:

```bash
# After changes in shared/
cd client && bun install
cd ../api && bun install
```

**Why this matters**: Bun symlinks workspace dependencies. When generated files change in shared/, the symlink doesn't automatically update - you must reinstall to refresh the dependency link.

**When to reinstall**:
- After `bun generate` in api/ (updates shared/generated/api-types/server.d.ts)
- After `bun push` or `bun generate` in db/ (updates shared/generated/prisma-client/)
- After manually editing shared/types/* files
- After ANY changes to shared/index.ts or other shared source files

### Local Database Setup
```bash
# Start PostgreSQL + Adminer (from project root)
docker-compose up -d

# Apply schema and manage database
cd db && bun push        # Apply schema migrations
cd db && bun start       # Open Prisma Studio for visual management
```

### OpenAPI/Swagger Testing

The API includes Swagger UI for interactive testing. Access it at `http://localhost:3000/openapi` when the API is running.

**Testing Protected Endpoints**:
1. Run the client app in development mode: `cd client && bun start`
2. Log in with a test account (or register a new one)
3. Navigate to Settings screen (only visible in development - tap your profile avatar, then scroll to Settings)
4. Find the "Firebase Token" section with a truncated token preview
5. Click the "Copy" button to copy the full token to clipboard
6. In Swagger UI, click the "Authorize" button
7. Paste the token (no "Bearer" prefix needed - Swagger adds it automatically)
8. Click "Authorize" to save

**Token Details**:
- Tap the token display to expand/collapse the full token value
- The truncated view shows first 10 and last 10 characters
- Copy button provides visual feedback (turns green with checkmark)
- Firebase ID tokens expire after 1 hour - refresh Settings screen to get a new token if you get 401 errors

**Why this approach**: Uses real Firebase authentication without any environment-specific bypass code. The tokens work identically to production tokens.

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
    as: 'global'
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
- Uses `.derive({ as: 'global' })` to make `firebase` context available to dependent middleware (like `firebaseGate`)
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
- **Base middleware (`firebaseMiddleware`)** uses `.derive({ as: 'global' })` so the `firebase` context is available to dependent middleware like `firebaseGate`
- **Gate middleware (`firebaseGate`)** uses `.derive({ as: 'scoped' })` as the final authentication guard
- Middleware placement within `.group()` callback determines which routes it applies to
- Routes defined before `.use(firebaseGate)` are public
- Routes defined after `.use(firebaseGate)` require authentication
- This pattern allows mixing public and protected routes in the same file
- Always document protected endpoints with `security: [{ bearerAuth: [] }]` in OpenAPI detail

**CRITICAL: Waiting for Auth Initialization on App Load**

On the **first app load**, Firebase's `auth.currentUser` may be `null` until `onAuthStateChanged` fires. This causes a race condition:
- Component mounts and calls `useEffect` immediately
- Calls `getIdToken()` which returns `null` (session not restored yet)
- Request fails with 401
- User sees "Try Again" error screen
- After tapping retry, Firebase has restored the session and call succeeds

**The Fix**:
- Import `useAuth()` from `@contexts` to access the `loading` state
- Wait for `loading` to become `false` before fetching authenticated data
- Example:
  ```typescript
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    // Only fetch after auth initialization completes
    if (!authLoading) {
      fetchSetlists();
    }
  }, [authLoading]);
  ```

**Why This Matters**:
- `AuthContext.loading` is set to `true` initially
- `onAuthStateChanged` listener restores the Firebase session
- `loading` becomes `false` once session is ready
- Only then is `getIdToken()` guaranteed to return a valid token
- Critical for first-load UX on apps with persisted authentication

**Applies to**:
- Any screen that needs authenticated API calls on mount
- Data-fetching screens in protected navigation flows
- Initial app setup screens after authentication

**CRITICAL: Firebase UID vs Database UserID Type Mismatch**

The app uses two different user identifiers that must be handled carefully:

1. **Firebase UID** (`firebase.uid`) - String returned by Firebase authentication (e.g., `"abc123xyz"`)
2. **Database UserID** (`userId`) - CUID stored in database (e.g., `"clp1234...abc"`)

**The Problem**:
- Middleware provides `firebase.uid` from Firebase tokens
- Database stores `userId` (CUID) as the primary user identifier
- Directly comparing them causes type mismatches: `"clp1234...abc" !== "abc123xyz"`
- This leads to failed permission checks and unexpected 404/403 errors

**The Solution**:
All service methods that need permission checks must convert Firebase UID to database UserID:

```typescript
const getUserIdByFirebaseUid = async (firebaseUid: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { firebaseUid },
    select: { userId: true },
  });
  if (!user) {
    throw new Error('User not found in database');
  }
  return user.userId;
};

// In service method:
const databaseUserId = await getUserIdByFirebaseUid(firebaseUid);
const isOwner = setlist.ownerId === databaseUserId; // Now both are CUIDs
```

**Pattern to Follow**:
- Routes pass `firebase.uid` (required by middleware)
- Controllers receive `firebaseUid` parameter name (for clarity)
- Services convert `firebaseUid` → `userId` before permission checks
- Always compare database identifiers to database fields

**Critical Mistake to Avoid**:
```typescript
// ❌ WRONG - Compares Firebase UID to database CUID
const isOwner = setlist.ownerId === firebase.uid;

// ✅ CORRECT - Converts Firebase UID first
const userId = await getUserIdByFirebaseUid(firebase.uid);
const isOwner = setlist.ownerId === userId;
```

**Where This Matters**:
- Permission checks (owner, guild member validation)
- Any Prisma query comparing user identifiers
- Optional authentication flows that need to check if user is the owner

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

**Screen Lifecycle and `useFocusEffect`**
- In React Navigation, screens stay mounted in the background even when not visible
- Use `useEffect` for effects that should run once on first mount (data fetching, setup)
- Use `useFocusEffect` for effects that should run when the screen comes into focus
- Use `useFocusEffect` for cleanup that should happen when the screen loses focus
- **Common use case**: Close WebSocket connections, cancel pending requests, or reset state when user navigates away
- Example:
  ```typescript
  import { useFocusEffect } from '@react-navigation/native';

  useFocusEffect(
    useCallback(() => {
      // This runs when screen comes into focus
      const socket = api.setlist[setlistId].ws.subscribe();

      return () => {
        // This cleanup runs when screen loses focus
        console.log('Closing socket');
        socket.close();
      };
    }, [setlistId])
  );
  ```

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

**Git Commits are Now Enabled**
- AI assistants can now execute git commits with proper safety measures
- Always create NEW commits (never use `--amend` unless explicitly requested)
- Commit messages should be clear and follow the format below
- Each commit should represent a working, tested state

**Workflow for Phase Completion**
When completing a phase from the plan:
1. Implement all changes in the phase
2. **Update the plan file** (e.g., `wiki/Plan-Setlist-Manager.md`):
   - Mark phase with ✅ **COMPLETE** status
   - Add "Implementation Summary" section describing what was built
   - List "Completed Tasks" with checkmarks
   - List "Files Created/Modified"
   - List "Deliverables Achieved"
   - Update top-level plan status if needed (e.g., "Phases 2, 6-10 complete")
3. Stage files with `git add [files]`
4. **Generate a detailed commit message** describing:
   - What phase was completed
   - Key files modified/created
   - Main features/functionality added
   - Include co-author credit: `Co-Authored-By: Claude [Model] <noreply@anthropic.com>`
5. Provide the commit message to the human
6. Human executes: `git commit -m "[message]"`

Example commit message format:
```
Phase 10: Create client services layer for tracks and setlists

- Add trackService with searchTracks method for global track database
- Add comprehensive setlistService with full CRUD operations:
  - SetList CRUD: create, read, update, delete, duplicate
  - SetItem operations: add, update, delete, reorder tracks
  - SetSection operations: add, update, delete sections
  - Sharing: create, list, and revoke share links
- All methods handle Firebase authentication and error handling
- Services follow established patterns with optional auth support

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

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

### Web Compatibility - Lessons Learned

**The Problem**: Band Together needed to function on web browsers, but core React Native patterns (SF Symbols icons and Alert.alert()) don't work on web.

**Challenge 1: Icon Rendering on Web**

Platform-specific icon systems break web compatibility:
- **SF Symbols (expo-symbols)**: iOS-only - appears blank/missing on web and Android
- **Solution**: Use font-based icon libraries that render everywhere
  - Font files load via CSS on all platforms (web, iOS, Android)
  - `@expo/vector-icons` with Ionicons provides 1300+ icons with universal support
  - Type-safe via `keyof typeof Ionicons.glyphMap` - TypeScript validates icon names at compile time
  - Icon names map naturally (many SF Symbol → Ionicons names are identical: `pencil`, `trash`, `plus`, etc.)

**Challenge 2: Native Alert Component Not Web-Compatible**

`Alert.alert()` doesn't work on web browsers:
- **Problem**: React Native's Alert is native (iOS UIAlertController), has no web implementation
- **Solution**: Build custom modal dialogs using View components with overlay styling
  - Use `absolute inset-0 bg-black/50` for full-screen overlay with semi-transparent background
  - Use `pointerEvents: { boxNone: true }` on overlay and `pointerEvents: { boxOnly: true }` on modal content for proper web click handling
  - Reusable `AlertModal` component with consistent styling, dark mode support, and multiple button variants
  - State management pattern with `alertConfig` object enables flexible alert usage across 30+ components

**Migration Strategy**: What Made This Successful

1. **Icon Migration First**: Changed the IconSymbol wrapper component once (1 file) rather than trying to add text labels to 50+ button usages
   - Single point of change: Future icon library updates only need IconSymbol modification
   - All existing `<IconSymbol name="..." />` usages work automatically with new library
   - Clean separation of icon rendering logic from component usage

2. **Reusable Modal Component**: Created `AlertModal.tsx` and applied consistent state management pattern across all files
   - Pattern: `alertConfig` state object with `visible`, `title`, `message`, and optional `buttons`
   - Eliminated code duplication: No copy-pasted modal View hierarchies across 17+ files
   - Consistent theming: All alerts automatically respect dark/light mode via Tailwind

3. **TypeScript for Confidence**: Icon names validated at compile time
   - `name: keyof typeof Ionicons.glyphMap` catches invalid icon names before runtime
   - Prevents "blank icon" errors from typos in icon names
   - Enabled safe refactoring across large codebase

**Scope of Migration**

- **48+ Alert.alert() calls** replaced across 17 files
- **28+ SF Symbol icon names** updated to Ionicons in 15+ components
- **2 files created/modified**: AlertModal.tsx + IconSymbol.tsx
- **30+ files updated** for state management or icon names
- **Result**: Full feature parity on web, iOS, and Android

**Challenge 3: Image Component Import Conflicts on Web**

When using `<Image>` components from React Native, there's a critical gotcha on web:
- **Problem**: React Native's `Image` component can conflict with the DOM's `Image` constructor on web
- **Error**: "Failed to construct 'Image': Please use the 'new' operator, this DOM object constructor cannot be called as a function"
- **Root cause**: If you use `<Image>` without importing it from `react-native`, the bundler may resolve it to the DOM's `Image` instead
- **Solution**: Always explicitly import `Image` from `react-native` at the top of the file
  ```typescript
  // ✅ CORRECT - Explicit import
  import { View, Text, Image } from 'react-native';

  // ❌ WRONG - Missing Image import, bundler resolves to DOM Image
  import { View, Text } from 'react-native';
  ```
- **Static asset syntax**: Use `require('@assets/path/to/image.png')` with `resizeMode="contain"` for proper aspect ratio handling
- **Never use CSS properties**: Don't try to use `backgroundImage` or other CSS properties in React Native style objects

**Key Takeaway**: When targeting multiple platforms, prefer universal solutions (font-based icons, custom components) over platform-specific APIs (SF Symbols, native alerts). The extra effort to build cross-platform components pays off in maintainability and coverage. Always be explicit about React Native imports to avoid conflicts with DOM APIs on web.

### Song Search - Lessons Learned (2026-01-24)

**Problem**: Search modal displayed blank results on mobile, especially with large result sets.

**Root Cause**: FlatList virtualization inefficiency when rendering search results.
- FlatList uses "windowing" (renders only visible items) which is efficient for long scrollable lists
- With search results (10-50 items), the overhead of virtualization caused rendering delays
- Some items would fail to render on first pass but display correctly on subsequent renders
- Broader searches (single letters like "A") returned many results, overwhelming FlatList's renderer

**Solution**: Replaced FlatList with ScrollView + map() for search results.
- ScrollView renders all items synchronously, eliminating virtualization overhead
- Simple and predictable: items render consistently on first try
- No performance penalty for typical search result sizes (< 100 items)
- Direct React rendering is easier to debug than FlatList's complex state management

**Key Insight**: FlatList is optimized for very long scrollable lists (1000+ items). For typical search results, the simplicity and predictability of ScrollView outweighs any theoretical performance benefits of virtualization.

**Additional Fixes**:
- Fixed type mismatches between API response (`TrackSearchResult`) and component expectations (`Track`)
- Added `defaultTuning` field to API search response for completeness
- Simplified item rendering to use inline styles instead of dynamic Tailwind classnames
- Added reset effect when modal opens to ensure clean state for each search
- Removed aggressive state clearing on track selection (prevented race conditions)
- Reordered conditional rendering to show results first

**Files Modified**:
- `client/src/components/setlist/SongSearchModal.tsx` - Replaced FlatList with ScrollView, fixed types
- `api/src/routes/tracks/tracks.service.ts` - Added `defaultTuning` to search results
- `shared/types/Track.ts` - Updated `TrackSearchResult` interface to include `defaultTuning`
- `client/src/navigation/screens/SetlistDetails.tsx` - Updated type expectations for track data

**Takeaway**: When choosing between FlatList and ScrollView, consider the typical list size:
- **ScrollView**: Simpler, better for < 100 items, predictable rendering
- **FlatList**: Better for 1000+ items where virtualization provides significant benefit
- Profile your actual use case rather than assuming FlatList is always better

---

**Last Updated**: 2026-01-24

**Recent Changes**:
- **Logo Image Integration** (2026-01-24)
  - Replaced "Band Together" text with `band-together-logo.png` image in AppHeader and DrawerContent
  - **Critical lesson**: Always import `Image` from `react-native` when using `<Image>` components
  - **Web conflict issue**: React Native's `Image` component conflicts with DOM's `Image` constructor on web
  - **Solution**: Import `Image` explicitly from `react-native` to ensure proper component usage
  - Never use CSS properties like `backgroundImage` with React Native - use proper `<Image>` syntax with `require()` for static assets
  - Files modified: `client/src/components/AppHeader.tsx`, `client/src/components/DrawerContent.tsx`
- **Completed Web Compatibility Migration** (2026-01-23)
  - **Icon Library Migration**: Migrated from `expo-symbols` (SF Symbols, iOS-only) to `@expo/vector-icons` (Ionicons)
    - Updated `IconSymbol` component to use Ionicons instead of SymbolView
    - Ionicons render on web via font-based CSS, supporting all platforms (iOS, Android, web)
    - Updated 28+ icon names across 15+ components to Ionicons equivalents
    - Added TypeScript type safety with `keyof typeof Ionicons.glyphMap`
    - Updated drawer navigation chevrons to use Ionicons instead of text placeholders
  - **Alert Modal Replacement**: Replaced all 48+ `Alert.alert()` calls with `AlertModal` component
    - Created reusable `AlertModal` component in `client/src/components/ui/AlertModal.tsx`
    - Implemented consistent state management pattern across 17+ files
    - Alert.alert() doesn't work on web; AlertModal uses View overlays that work everywhere
    - Supports button styles: 'default' (blue), 'cancel' (gray), 'destructive' (red)
    - Dark mode support via Tailwind theming
  - **Files Modified**: 30+ files across authentication, guild/entity CRUD, detail screens, and setlist features
  - **Key Files Created**: `client/src/components/ui/AlertModal.tsx`
  - **Testing**: All changes verified to work on web, iOS, and Android
  - **Result**: Band Together is now fully functional on web with feature parity to mobile
- Completed Phase 22: Polish and Testing
  - Added loading skeleton components (Skeleton, SetlistCardSkeleton, SetlistDetailsSkeleton)
  - Fixed Firebase auth race condition in SetlistDetails and CreateSetlist
  - Replaced web-incompatible Alert.alert() with custom modals
  - Added delete confirmation modal with proper error handling
  - Added More button options modal (Duplicate, Delete, Cancel)
  - Updated CLAUDE.md with guidance for buttons/icons and dialogs for web-first apps
  - Created Phase-22-Polish-Bugs.md wiki documenting 4 bugs found during testing
- Re-enabled git commits for AI assistants

**Key Learning**: The correct Elysia pattern for Firebase authentication uses a two-tier approach:
- `firebaseMiddleware`: Uses `.derive({ as: 'global' })` to create reusable base middleware that makes `firebase` context available to dependent middleware
- `firebaseGate`: Uses `.derive({ as: 'scoped' })` as a final guard that requires authentication
This is more composable than scoped-only approach and prevents context loss when middleware chains use routes in different scopes.

**Git Workflow**:
- AI assistants can now execute git commits directly
- Always review staged changes with `git status` before committing
- Use clear, descriptive commit messages that explain the "why" not just the "what"
- Each commit should be a logical unit of work

Happy coding! 🎵
