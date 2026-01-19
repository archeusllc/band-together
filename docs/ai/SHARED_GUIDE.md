# Band Together Shared - Development Guide

## Overview

The shared module contains **reusable code** that is imported by both the client and API applications.

**Purpose:**
- Centralize type definitions used across submodules
- Share constants and utilities
- Ensure consistency between client and API
- Reduce code duplication

## Directory Structure

```
shared/
├── src/
│   ├── types/              # Shared TypeScript type definitions
│   │   ├── index.ts        # Main export file
│   │   ├── models.ts       # Data model types (User, Band, Venue, etc.)
│   │   ├── api.ts          # API request/response types
│   │   └── ...             # Other type files as needed
│   │
│   └── index.ts            # Main export file
│
├── tsconfig.json           # TypeScript config with path aliases
├── package.json
└── README.md               # Shared module documentation
```

## Path Aliases

| Alias | Maps To | Use For |
|-------|---------|---------|
| `@types/*` | `src/types/*` | Type definitions |
| `@/*` | `src/*` | Root exports |

## What Goes in Shared

### ✅ Include These

1. **Type Definitions**
   - Data models (User, Band, Venue, Event, etc.)
   - API request/response types
   - Common enums and constants
   ```typescript
   // src/types/models.ts
   export type User = {
     id: string
     name: string
     email: string
   }

   export type Band = {
     id: string
     name: string
     members: User[]
   }
   ```

2. **API Contract Types**
   - Request/response interfaces
   - Used by both client and API
   ```typescript
   // src/types/api.ts
   export type GetUserRequest = {
     userId: string
   }

   export type GetUserResponse = {
     user: User
     success: boolean
   }
   ```

3. **Enums and Constants**
   - Status types used across modules
   - Platform-agnostic constants
   ```typescript
   export enum UserRole {
     ADMIN = 'admin',
     MUSICIAN = 'musician',
     VENUE = 'venue',
     FAN = 'fan',
   }

   export const API_VERSION = 'v1'
   ```

### ❌ Don't Include These

- UI Components (client-specific)
- Express middleware (API-specific)
- Platform-specific code
- Business logic (belongs in client/api services)
- Database models (belongs in api/db)

## Usage in Client

```typescript
// client/src/screens/UserProfile.tsx
import type { User } from '@types/models'
import { UserRole } from '@types/models'

type UserProfileProps = {
  user: User
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <View>
      <Text>{user.name}</Text>
      {user.role === UserRole.MUSICIAN && <MusicianBadge />}
    </View>
  )
}
```

## Usage in API

```typescript
// api/src/controllers/UserController.ts
import type { User, GetUserResponse } from '@types/models'
import { UserService } from '@services/UserService'

export class UserController {
  private userService = new UserService()

  getUser = async (userId: string): Promise<GetUserResponse> => {
    const user = await this.userService.getUserById(userId)
    return {
      user,
      success: true,
    }
  }
}
```

## Best Practices

1. **Single Responsibility** - Keep files focused
2. **Clear Naming** - Type names should be obvious
3. **Documentation** - Document complex types with comments
4. **No Implementation** - Shared module should only have types/constants
5. **Update Both Sides** - When shared types change, update client and API
6. **Version Control** - Keep track of breaking changes

## Organizing Types

### By Feature

```typescript
// src/types/user.ts
export type User = { ... }
export type CreateUserInput = { ... }

// src/types/band.ts
export type Band = { ... }
export type BandMember = { ... }

// src/types/venue.ts
export type Venue = { ... }
```

### By Category

```typescript
// src/types/models.ts - Data models
export type User = { ... }
export type Band = { ... }

// src/types/api.ts - API request/response
export type GetUserRequest = { ... }
export type GetUserResponse = { ... }

// src/types/errors.ts - Error types
export type ApiError = { ... }
```

## Example Shared Module

```typescript
// src/types/index.ts
export type * from './models'
export type * from './api'
export * from './constants'

// src/types/models.ts
export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export type Band = {
  id: string
  name: string
  genre: string
  members: User[]
}

export enum UserRole {
  ADMIN = 'admin',
  MUSICIAN = 'musician',
  VENUE = 'venue',
  FAN = 'fan',
}

// src/types/api.ts
export type GetBandResponse = {
  band: Band
  error?: string
}

export type CreateBandRequest = {
  name: string
  genre: string
  memberIds: string[]
}

// src/index.ts
export * from './types'
```

## Import Examples

```typescript
// From Client
import type { User, Band, UserRole } from '@band-together/shared'

// From API
import type { CreateBandRequest, GetBandResponse } from '@band-together/shared'
```

## Publishing Shared

If `shared` is published as an npm package:

```json
{
  "name": "@band-together/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

Then import as:
```typescript
import type { User } from '@band-together/shared'
```

## Synchronizing Changes

When updating shared types:

1. **Update the shared module**
   ```typescript
   // shared/src/types/models.ts
   export type User = {
     id: string
     name: string
     email: string
     newField: string  // ✨ NEW
   }
   ```

2. **Update client to use new field**
   ```typescript
   // client/src/components/UserCard.tsx
   export const UserCard = ({ user }: { user: User }) => {
     return <View>{user.newField}</View>
   }
   ```

3. **Update API to handle new field**
   ```typescript
   // api/src/services/UserService.ts
   async createUser(input: CreateUserInput) {
     // Handle newField in database insert
   }
   ```

## Related Guides

- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - General code style (applies to shared types too)
- **[CLIENT_GUIDE.md](./CLIENT_GUIDE.md)** - How client uses shared types
- **[API_GUIDE.md](./API_GUIDE.md)** - How API uses shared types

---

**Last Updated**: 2026-01-18
