# Band Together API - Development Guide

## Overview

The API is a **Node.js/Express backend** that serves the client applications (mobile and web).

**Key Stack:**
- Node.js + Express
- TypeScript (strict mode)
- Database: [Check `/db` directory for current setup]
- Authentication: [JWT/Session-based - see API docs]

## Directory Structure

```
api/
├── src/
│   ├── controllers/        # Route handlers & business logic
│   ├── middleware/         # Express middleware
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic & database access
│   ├── types/              # TypeScript type definitions
│   └── index.ts            # Server entry point
│
├── tsconfig.json           # TypeScript config with path aliases
├── package.json
└── README.md               # API-specific documentation
```

## Path Aliases

| Alias | Maps To | Use For |
|-------|---------|---------|
| `@routes/*` | `src/routes/*` | API route definitions |
| `@controllers/*` | `src/controllers/*` | Route controllers |
| `@middleware/*` | `src/middleware/*` | Express middleware |
| `@services/*` | `src/services/*` | Business logic |
| `@types/*` | `src/types/*` | Type definitions |
| `@/*` | `src/*` | Fallback (avoid when specific alias exists) |

## Import Examples

```typescript
// ✅ CORRECT - Use specific aliases
import { UserController } from '@controllers/UserController'
import { authMiddleware } from '@middleware/auth'
import { userRoutes } from '@routes/users'
import { UserService } from '@services/UserService'
import type { User } from '@types/models'

// ❌ WRONG - Don't use relative paths
import { UserController } from '../controllers/UserController'
```

## Best Practices

1. **Always use path aliases** - Never use relative imports
2. **Use arrow functions** - All exports must be arrow functions
3. **Type everything** - No `any`, use TypeScript strict mode
4. **Organize by feature** - Group related controllers, services, routes
5. **Middleware pattern** - Use Express middleware for cross-cutting concerns
6. **Error handling** - Consistent error responses and logging
7. **Validation** - Validate all inputs at route level
8. **Services layer** - Keep business logic in services, not controllers
9. **Testing** - Write tests for critical business logic
10. **Documentation** - Document API endpoints and data models

## Component Patterns

### Route Definition

```typescript
import { Router } from 'express'
import { UserController } from '@controllers/UserController'

export const userRoutes = Router()

const controller = new UserController()

userRoutes.get('/:id', (req, res) => controller.getUser(req, res))
userRoutes.post('/', (req, res) => controller.createUser(req, res))
userRoutes.put('/:id', (req, res) => controller.updateUser(req, res))
userRoutes.delete('/:id', (req, res) => controller.deleteUser(req, res))
```

### Controller

```typescript
import { Request, Response } from 'express'
import { UserService } from '@services/UserService'

export const UserController = class {
  private userService = new UserService()

  getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.id)
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' })
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: 'Invalid user data' })
    }
  }
}
```

### Service

```typescript
import type { User, CreateUserInput } from '@types/models'

export const UserService = class {
  async getUserById(id: string): Promise<User> {
    // Database query
    return { id, name: 'User Name' }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    // Validation, database insert
    return { id: 'new-id', ...input }
  }
}
```

## Common Patterns

### Error Handling

```typescript
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message)
  }
}

// Usage
if (!user) {
  throw new ApiError(404, 'User not found')
}
```

### Type Definitions

```typescript
// @types/models.ts
export type User = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt'>
```

### Middleware

```typescript
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  // Verify token
  next()
}
```

## API Documentation

For detailed API endpoint documentation, method signatures, and data models, see:
- `/api/README.md` - API-specific setup and overview
- [Project Wiki - API](https://github.com/archeusllc/band-together/wiki) - Full API documentation

## Related Guides

- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - General code style
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - How API fits into the project

---

**Last Updated**: 2026-01-18
