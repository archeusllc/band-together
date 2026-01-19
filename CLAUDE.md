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

```bash
# Setup and installation
bun install-all           # Install all packages
bun run setup             # Initial project setup

# Development
bun run dev               # Start all dev servers
bun run db:connect        # Connect to database

# Database
docker-compose up -d      # Start PostgreSQL + Adminer
bun run db:push          # Push schema changes
bun run db:studio        # Open Prisma Studio
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

## Getting Help

- **Comprehensive Context**: See [AI Context Guide](wiki/AI-Context.md)
- **Architecture Questions**: Check the wiki for project structure details
- **Code Examples**: Reference existing code in `client/src/` and `api/src/`
- **Issues**: Check project README or GitHub issues

---

**Last Updated**: 2026-01-18

**Recent Changes**:
- Implemented device-based dark mode with automatic theme switching
- Centralized all theme colors and Tailwind classnames in `@theme` module
- Updated all screen components to use centralized theme

Happy coding! 🎵
