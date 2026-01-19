# AI Guidance Documentation

Welcome! This directory contains all AI-related guidance and context files for the Band Together project.

## Quick Start

### For AI Assistants (Claude, Cursor, etc.)
Start here based on what you're working on:

1. **New to the project?** → Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
2. **Working on the client app?** → Read [CLIENT_GUIDE.md](./CLIENT_GUIDE.md)
3. **Working on the API?** → Read [API_GUIDE.md](./API_GUIDE.md)
4. **Working on shared code?** → Read [SHARED_GUIDE.md](./SHARED_GUIDE.md)
5. **Writing code anywhere?** → Read [STYLE_GUIDE.md](./STYLE_GUIDE.md)

### For Humans
- **Full Index**: [index.md](./index.md) - Overview of all files and how they're used
- **For GitHub**: The project wiki also has an [AI-Agents page](https://github.com/archeusllc/band-together/wiki/AI-Agents)

## File Organization

```
docs/ai/
├── README.md                   # This file
├── index.md                    # Overview and how files are used
├── STYLE_GUIDE.md              # General code style (arrow functions, imports, etc.)
├── CLIENT_GUIDE.md             # React Native/Expo client specifics
├── API_GUIDE.md                # Backend API specifics
├── SHARED_GUIDE.md             # Shared code (types, constants)
└── PROJECT_STRUCTURE.md        # Overall project layout and architecture
```

## Key Rules Summary

### Arrow Functions
```typescript
// ✅ Always use arrow functions for exports
export const ComponentName = () => { ... }

// ❌ Never use function declarations
export function ComponentName() { ... }
```

### Path Aliases
```typescript
// ✅ Use specific aliases (not @/*)
import { Button } from '@components/Button'
import { Home } from '@screens/Home'
import { useTheme } from '@hooks/useTheme'

// ❌ Don't use relative paths
import { Button } from './components/Button'
```

### Import Order
1. External libraries (React, React Native, third-party)
2. Path-aliased imports (@components, @hooks, etc.)
3. Type imports (type definitions)
4. Relative imports (minimized)

## For IDE Integration

### Cursor AI
- Automatically reads `.cursorrules` from project root
- See `/Users/blee/band-together/.cursorrules` for quick rules
- See this directory for detailed guidance

### VS Code with Claude Extension
- Use these guides as context in conversations
- Reference: "Per CLIENT_GUIDE.md, use @components/ aliases"

### Other IDEs
- Copy relevant sections from the guides as context
- Reference the docs when discussing code style

## Updating These Files

When making code style decisions:

1. Update the relevant guide in this directory
2. Update `.cursorrules` files if it's a quick reference item
3. Communicate changes to the team via commit message

Example:
```bash
# Commit message when updating a guide
docs: update CLIENT_GUIDE.md with new hook pattern guidelines
```

## External Resources

- **[Project Wiki](https://github.com/archeusllc/band-together/wiki)** - Full project documentation
- **[AI-Agents Wiki Page](https://github.com/archeusllc/band-together/wiki/AI-Agents)** - AI tool integration guidance
- **Project README**: [/README.md](/README.md)

## Quick Reference Table

| File | Purpose | Read When |
|------|---------|-----------|
| `STYLE_GUIDE.md` | General code style across all modules | Writing any code |
| `CLIENT_GUIDE.md` | React Native/Expo specific patterns | Working on `/client` |
| `API_GUIDE.md` | Backend API patterns | Working on `/api` |
| `SHARED_GUIDE.md` | Shared types and utilities | Working on `/shared` |
| `PROJECT_STRUCTURE.md` | How everything fits together | New to the project |

## Common Questions

**Q: Should I use `@/` or `@components/`?**
A: Use `@components/`. The `@/` alias is a fallback only. See CLIENT_GUIDE.md.

**Q: Do I write `export function` or `export const`?**
A: Always `export const`. Never use `export function`. See STYLE_GUIDE.md.

**Q: Where do I put new types?**
A: Shared types go in `/shared/src/types`. Module-specific types go in that module's types folder. See SHARED_GUIDE.md.

**Q: How do I organize imports?**
A: External → Aliases → Types → Relative. See STYLE_GUIDE.md Import Organization section.

## File Locations

**Quick rules (for Cursor IDE):**
- `/Users/blee/band-together/.cursorrules` - Project-level rules
- `/Users/blee/band-together/client/.cursorrules` - Client-specific rules

**Detailed documentation (in this directory):**
- All markdown files in `/docs/ai/`

---

**Last Updated**: 2026-01-18
**Questions?** Check the relevant guide file or the [Project Wiki](https://github.com/archeusllc/band-together/wiki)
