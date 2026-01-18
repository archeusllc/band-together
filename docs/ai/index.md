# AI Context & Guidance Files

This directory contains all AI-related guidance files for the Band Together project. These files help Claude and other AI tools understand the project structure, code style preferences, and best practices.

## Files in This Directory

### Core Guidelines
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Code style preferences and conventions
  - Arrow function syntax for components
  - Import organization
  - TypeScript usage
  - Component best practices

### Submodule-Specific Guides
- **[CLIENT_GUIDE.md](./CLIENT_GUIDE.md)** - Client (React Native/Expo) specific guidance
  - Directory structure
  - Path aliases (@components, @hooks, etc.)
  - Import patterns and examples
  - Common mistakes to avoid

- **[API_GUIDE.md](./API_GUIDE.md)** - API submodule guidance
  - Path aliases (@routes, @controllers, etc.)
  - Project structure
  - Best practices

- **[SHARED_GUIDE.md](./SHARED_GUIDE.md)** - Shared module guidance
  - Type definitions
  - Shared utilities
  - Path aliases

### Workspace Guidelines
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Overview of the entire project layout
  - Root-level organization
  - Submodule descriptions
  - How components interact

## Quick Reference

### Code Style
```typescript
// ✅ Arrow functions for all exports
export const ComponentName = () => { ... }

// ❌ Avoid function declarations
export function ComponentName() { ... }
```

### Path Aliases (Client)
```typescript
// Use specific aliases, not generic @/*
import { Button } from '@components/Button'      // ✅
import { Button } from '@/components/Button'     // ❌
import { Button } from './components/Button'     // ❌
```

### Import Order
1. External libraries
2. Path-aliased imports
3. Type definitions
4. Relative imports (minimized)

## How AI Assistants Use These Guides

These files are referenced by:
- **Cursor AI** - Via `.cursorrules` files (project & client roots)
- **Claude Code** - Via explicit context in conversations
- **Other AI tools** - Via documentation in `/docs/ai`

The `.cursorrules` files in the project root and client directory provide quick access to rules, while this documentation directory provides detailed explanations and context.

### External Resources
- **[AI-Agents Wiki Page](https://github.com/archeusllc/band-together/wiki/AI-Agents)** - Project wiki page with additional AI integration guidance
  - Contains information on using AI tools with Band Together
  - Best practices for AI-assisted development
  - Specific configurations for different AI platforms

## Keeping These Files Updated

When making changes to project conventions:
1. Update the relevant guide in `/docs/ai`
2. Sync changes with `.cursorrules` files in project root and `/client`
3. Communicate changes to the team

## Using These Files

For AI-assisted development:
```bash
# Provide context when starting Claude Code sessions
# Include relevant guide references in your prompts
# Example: "Use the guidelines from CLIENT_GUIDE.md"
```

For IDE integration (Cursor, etc.):
- These are automatically picked up via `.cursorrules` files
- No additional setup needed

---

**Last Updated**: 2026-01-18
**Project**: Band Together - Musicians, Venues, & Fans Platform
