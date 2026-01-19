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

Happy coding! 🎵
