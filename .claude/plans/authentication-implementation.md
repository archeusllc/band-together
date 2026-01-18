# Backend Authentication Implementation Plan

## Overview

Implement production-ready authentication for the Band Together API, including user registration, login, logout, and password reset. The current implementation is scaffolded but incomplete - all auth controller methods are placeholders, the User model lacks password storage, and there's no credential verification.

## Current State

**What Exists:**
- Elysia.js API with JWT middleware scaffolded
- Auth routes: `/auth/login`, `/auth/logout`, `/auth/register`, `/auth/reset`
- Placeholder auth controller methods (all TODOs)
- JWT infrastructure via `@elysiajs/jwt`
- Prisma ORM with PostgreSQL
- User model without password field

**What's Missing:**
- Password hashing implementation
- Database password field
- Actual credential verification
- User creation/lookup logic
- Proper error handling
- Input validation
- Rate limiting
- Security best practices

## Implementation Approach

### 1. Database Schema Updates

**File:** `/Users/blee/band-together/db/prisma/schema.prisma`

Add authentication fields to User model:

```prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String    // Argon2id hash
  displayName  String?
  photoUrl     String?

  // Email verification (for future)
  emailVerified Boolean   @default(false)
  emailVerificationToken String?
  emailVerificationExpiry DateTime?

  // Password reset
  passwordResetToken String?
  passwordResetExpiry DateTime?

  // Security tracking
  lastLoginAt  DateTime?

  // Account status
  isActive     Boolean   @default(true)

  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([email])
  @@index([emailVerificationToken])
  @@index([passwordResetToken])
}
```

**Migration steps:**
1. Run migration: `bunx --bun prisma migrate dev --name add_auth_fields`
2. Regenerate Prisma client: `bun generate` in db directory
3. Types automatically copy to shared module

### 2. Shared Types Structure

**File:** `/Users/blee/band-together/shared/types/Auth.ts` (new)

```typescript
// Request types
export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Response types
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName: string | null;
    photoUrl: string | null;
    emailVerified: boolean;
  };
}

export interface AuthError {
  error: string;
  message: string;
}

// JWT payload structure
export interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}
```

**Update:** `/Users/blee/band-together/shared/types/index.ts`
- Add: `export * from './Auth.js';`

**Rationale:** These types are shared between API and client for end-to-end type safety. Never expose sensitive fields (passwordHash, tokens) in responses.

### 3. Password Service Implementation

**File:** `/Users/blee/band-together/api/src/services/password.service.ts` (new)

Use Bun's native Argon2id support (no external dependencies needed):

```typescript
export class PasswordService {
  private static readonly HASH_CONFIG = {
    algorithm: "argon2id" as const,
    memoryCost: 19456,  // 19 MiB (OWASP recommended)
    timeCost: 2,        // 2 iterations
  };

  static async hash(password: string): Promise<string> {
    return Bun.password.hash(password, this.HASH_CONFIG);
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return Bun.password.verify(password, hash);
  }

  static validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (password.length > 128) {
      return "Password must be less than 128 characters";
    }
    return null;
  }
}
```

**Update:** `/Users/blee/band-together/api/src/services/index.ts`
- Add: `export * from './password.service.js';`

**Security Notes:**
- Argon2id is the industry standard (winner of Password Hashing Competition)
- Better resistance to GPU/ASIC attacks than bcrypt
- Bun's native implementation uses worker threads (non-blocking)

### 4. Auth Controller Implementation

**File:** `/Users/blee/band-together/api/src/controllers/auth.controller.ts`

Replace all placeholder methods with full implementations:

**Register method:**
- Validate email format and password strength
- Check for existing user (case-insensitive email)
- Hash password using PasswordService
- Create user in database with Prisma
- Generate JWT token
- Set httpOnly cookie
- Return safe user data (exclude passwordHash)

**Login method:**
- Find user by email (case-insensitive)
- Use constant-time comparison to prevent timing attacks
- Verify password with PasswordService
- Check account isActive status
- Update lastLoginAt timestamp
- Generate JWT token
- Set httpOnly cookie
- Return safe user data

**Logout method:**
- Clear authentication cookie
- Return success status

**Password reset methods:**
- `resetPasswordRequest`: Generate reset token, store with expiry (1 hour), log token (in production: send email)
- `resetPasswordConfirm`: Validate token & expiry, hash new password, update database, clear reset token

**Security Features:**
- No user enumeration (generic error messages)
- Constant-time password comparison
- Account deactivation support
- Token expiry validation
- Input sanitization

### 5. Enhanced Auth Middleware

**File:** `/Users/blee/band-together/api/src/middleware/auth.middleware.ts`

Update `authGuard` to properly verify JWT and populate user context:

```typescript
export const authGuard = async ({ jwt, cookie, user, set }: any) => {
  const token = cookie.token?.value;
  if (!token) {
    set.status = 401;
    throw new Error('No authentication token provided');
  }

  const payload = await jwt.verify(token) as JWTPayload | false;
  if (!payload) {
    set.status = 401;
    throw new Error('Invalid or expired token');
  }

  // Fetch user from database
  const dbUser = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      email: true,
      displayName: true,
      photoUrl: true,
      emailVerified: true,
      isActive: true,
    }
  });

  if (!dbUser || !dbUser.isActive) {
    set.status = 401;
    throw new Error('User not found or inactive');
  }

  // Populate user context
  Object.assign(user, dbUser);
};
```

Add JWT expiry configuration: `exp: '7d'`

**File:** `/Users/blee/band-together/api/src/middleware/user.middleware.ts`

Update user decorator to include all fields:

```typescript
.decorate('user', {
  id: undefined,
  email: undefined,
  displayName: undefined,
  photoUrl: undefined,
  emailVerified: undefined,
} as Partial<User>);
```

### 6. Updated Auth Routes

**File:** `/Users/blee/band-together/api/src/routes/auth.routes.ts`

Update routes with:
- Proper status codes (201 for registration, 401 for auth failures, 400 for validation errors)
- Input validation using Elysia's TypeBox (`t.Object`, `t.String`)
- Email format validation
- Password length constraints (8-128 chars)
- OpenAPI documentation metadata
- Error handling with set.status

Route updates:
- POST `/auth/register` - 201 on success, 400 on error
- POST `/auth/login` - 200 on success, 401 on auth failure
- POST `/auth/logout` - 200 on success
- POST `/auth/reset-password` - Accept email, return success message
- POST `/auth/reset-password/confirm` - Accept token and newPassword

### 7. Rate Limiting

**Install dependency:**
```bash
bun add elysia-rate-limit
```

**File:** `/Users/blee/band-together/api/src/middleware/rate-limit.middleware.ts` (new)

```typescript
import { rateLimit } from 'elysia-rate-limit';

// Auth endpoints: 5 attempts per 15 minutes per IP
export const authRateLimit = new Elysia()
  .use(rateLimit({
    duration: 15 * 60_000,
    max: 5,
    errorResponse: {
      error: 'Too Many Requests',
      message: 'Too many authentication attempts. Try again in 15 minutes.'
    }
  }));
```

**Update:** `/Users/blee/band-together/api/src/routes/auth.routes.ts`
- Add `.use(authRateLimit)` to auth route group (before authMiddleware)

### 8. Environment Configuration

**File:** `/Users/blee/band-together/api/.env.development`

Add NODE_ENV variable:
```env
NODE_ENV="development"
```

This enables secure cookie settings in production (secure: true when NODE_ENV=production).

### 9. API-Specific Types

**File:** `/Users/blee/band-together/api/src/types/auth.types.ts`

Update with controller context types:

```typescript
import { User } from "@band-together/shared";
import { Cookie } from "elysia";

export interface AuthContext {
  jwt: {
    sign: (payload: any) => Promise<string>;
    verify: (jwt?: string) => Promise<any>;
  };
  cookie: Record<string, Cookie<any>>;
  set: {
    status?: number;
  };
}

export interface RegisterContext extends AuthContext {
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginContext extends AuthContext {
  email: string;
  password: string;
  user: User;
}
```

## Critical Files to Modify

1. **[db/prisma/schema.prisma](../db/prisma/schema.prisma)** - Add passwordHash, emailVerified, reset tokens, lastLoginAt, isActive fields
2. **[api/src/controllers/auth.controller.ts](../api/src/controllers/auth.controller.ts)** - Implement all auth methods with Prisma queries and JWT
3. **[api/src/middleware/auth.middleware.ts](../api/src/middleware/auth.middleware.ts)** - Update authGuard to verify JWT and populate user context
4. **[api/src/routes/auth.routes.ts](../api/src/routes/auth.routes.ts)** - Add validation, status codes, error handling
5. **[shared/types/Auth.ts](../shared/types/Auth.ts)** - Create with auth request/response types (NEW FILE)
6. **[api/src/services/password.service.ts](../api/src/services/password.service.ts)** - Create password hashing service (NEW FILE)
7. **[api/src/middleware/rate-limit.middleware.ts](../api/src/middleware/rate-limit.middleware.ts)** - Create rate limiting (NEW FILE)

## Implementation Order

### Phase 1: Database Foundation
1. Update Prisma schema with auth fields
2. Run migration: `cd db && bunx --bun prisma migrate dev --name add_auth_fields`
3. Regenerate client: `cd db && bun generate`
4. Verify types copied to shared module

### Phase 2: Type Definitions
5. Create `shared/types/Auth.ts` with request/response types
6. Update `shared/types/index.ts` to export Auth types
7. Update `api/src/types/auth.types.ts` with context types

### Phase 3: Core Services
8. Create `api/src/services/password.service.ts` with Bun.password
9. Export from `api/src/services/index.ts`

### Phase 4: Auth Controller
10. Implement register method in `auth.controller.ts`
11. Implement login method
12. Implement logout method
13. Implement password reset methods

### Phase 5: Middleware Enhancement
14. Update `authGuard` to verify JWT and populate user context
15. Update `userMiddleware` with all user fields
16. Add JWT expiry configuration to authMiddleware

### Phase 6: Routes & Validation
17. Update `auth.routes.ts` with validation schemas
18. Add proper status codes and error handling
19. Add OpenAPI documentation metadata

### Phase 7: Security Hardening
20. Install `elysia-rate-limit` dependency
21. Create `rate-limit.middleware.ts`
22. Apply rate limiting to auth routes
23. Add NODE_ENV to `.env.development`

## Security Checklist

- ✅ Passwords hashed with Argon2id (industry standard)
- ✅ JWT tokens in httpOnly cookies
- ✅ Secure cookie settings (httpOnly, sameSite, secure in production)
- ✅ No user enumeration in error messages
- ✅ Constant-time password comparison
- ✅ Input validation on all endpoints
- ✅ Rate limiting (5 attempts per 15 minutes)
- ✅ Password strength requirements (8-128 chars)
- ✅ Token expiry (7 days)
- ✅ Account deactivation support
- ✅ No sensitive data in JWT payload or responses
- ✅ Last login tracking

## Verification Plan

After implementation, verify the authentication system works end-to-end:

### 1. Database Verification
```bash
cd db
bunx --bun prisma studio
```
- Verify User model has new fields (passwordHash, emailVerified, etc.)
- Check that indexes were created

### 2. API Server Start
```bash
cd api
bun run dev
```
- Verify server starts without errors on http://localhost:3000
- Check health endpoint: `curl http://localhost:3000/health`

### 3. Registration Flow
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","displayName":"Test User"}' \
  -c cookies.txt -v
```
- Verify 201 status code
- Verify response contains user object (id, email, displayName)
- Verify JWT cookie is set in response headers
- Check database: User created with hashed password

### 4. Login Flow
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt -v
```
- Verify 200 status code
- Verify JWT cookie is set
- Check database: lastLoginAt is updated

### 5. Protected Route Access
```bash
curl http://localhost:3000/profile -b cookies.txt
```
- Verify 200 status code (authenticated)
- Verify user data returned

```bash
curl http://localhost:3000/profile
```
- Verify 401 status code (no auth cookie)

### 6. Invalid Credentials
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"wrongpassword"}' -v
```
- Verify 401 status code
- Verify generic error message (no user enumeration)

### 7. Rate Limiting
Run login 6 times rapidly:
```bash
for i in {1..6}; do
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}' -v
  echo "\nAttempt $i"
done
```
- Verify first 5 attempts return 401
- Verify 6th attempt returns 429 (Too Many Requests)

### 8. Logout Flow
```bash
curl -X POST http://localhost:3000/auth/logout -b cookies.txt -c cookies.txt -v
```
- Verify 200 status code
- Verify cookie is cleared

```bash
curl http://localhost:3000/profile -b cookies.txt
```
- Verify 401 status code (cookie cleared)

### 9. Password Reset Flow
Request reset:
```bash
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' -v
```
- Verify 200 status code
- Check server logs for reset token
- Check database: passwordResetToken and passwordResetExpiry are set

Confirm reset (use token from logs):
```bash
curl -X POST http://localhost:3000/auth/reset-password/confirm \
  -H "Content-Type: application/json" \
  -d '{"token":"<token-from-logs>","newPassword":"newpassword123"}' -v
```
- Verify 200 status code
- Check database: passwordHash changed, reset token cleared
- Login with new password to verify

### 10. OpenAPI Documentation
Visit: http://localhost:3000/openapi
- Verify all auth endpoints documented
- Check request/response schemas
- Test endpoints via Swagger UI

### 11. Type Safety Check
```bash
cd api
bun run build
```
- Verify no TypeScript errors
- Check that shared types are imported correctly

## Out of Scope (Future Enhancements)

- Email verification flow (scaffolded but not implemented)
- Email service integration (SendGrid, AWS SES)
- Refresh token rotation
- Multi-factor authentication (MFA)
- OAuth integration (Google, GitHub)
- Session management UI
- Failed login attempt tracking/lockout
- Security event logging

## Notes

- Client implementation is NOT in scope for this plan
- Password reset logs tokens to console (production should send emails)
- Email verification fields added to schema but flow not implemented
- Rate limiting uses in-memory LRU cache (consider Redis for multi-instance deployments)
