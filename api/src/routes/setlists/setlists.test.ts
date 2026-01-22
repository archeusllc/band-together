import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';

import { setlistRoutes } from './setlists.routes';

const createElysia = () => new Elysia()
  .use(setlistRoutes);

let app = createElysia()

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Setlists CRUD', () => {
  describe('POST /setlist - Create Setlist', () => {
    test('should reject unauthenticated requests with 401', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer invalid-token',
        },
        body: JSON.stringify({
          name: 'My Setlist',
        })
      }));
      expect(response.status).toBe(401);
    });

    test('should reject requests without authentication header with 401', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My Setlist',
        })
      }));
      expect(response.status).toBe(401);
    });

    test('should validate that name field is required (422 when missing)', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
        body: JSON.stringify({
          description: 'A cool setlist without a name',
        })
      }));
      expect(response.status).toBe(422);
    });

    test.todo('should create a new setlist with authenticated user (requires Prisma user mock)', async () => {
      // TODO: Mock Prisma user and test setlist creation
    });
    test.todo('should create a setlist with guild association (requires Prisma guild mock)', async () => {
      // TODO: Mock Prisma guild and test guild association
    });
    test.todo('should return created setlist with all relations (requires database)', async () => {
      // TODO: Mock database and verify all relations are returned
    });
  });

  describe('GET /setlist - Get User Setlists', () => {
    test('should reject unauthenticated requests with 401', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid-token',
        },
      }));
      expect(response.status).toBe(401);
    });

    test.todo('should return user setlists separated into personal and shared (requires Prisma mock)', async () => {
      // TODO: Mock Prisma to return test user's setlists
    });
    test.todo('should include guild-associated setlists for guild member (requires Prisma mock)', async () => {
      // TODO: Mock guild membership and verify guild setlists are included
    });
  });

  describe('GET /setlist/:setlistId - Get Setlist by ID', () => {
    test('should return 404 for non-existent setlist', async () => {
      const response = await app.handle(new Request(`${URL}/setlist/non-existent-id`, {
        method: 'GET',
      }));
      expect(response.status).toBe(404);
    });

    test('should allow unauthenticated access for getting setlist by ID', async () => {
      const response = await app.handle(new Request(`${URL}/setlist/non-existent-id`, {
        method: 'GET',
      }));
      // Either 404 (not found) or success, but not 401 (unauthorized)
      expect([200, 404]).toContain(response.status);
    });

    test.todo('should return setlist for owner (requires Prisma mock)', async () => {
      // TODO: Mock setlist and owner, verify retrieval with proper relations
    });
    test.todo('should support shareToken query param for public access (requires Prisma mock)', async () => {
      // TODO: Mock setlist with share, test access via shareToken
    });
  });

  describe('PATCH /setlist/:setlistId - Update Setlist', () => {
    test.todo('should reject unauthenticated requests with 401', async () => {
      // TODO: Test authentication requirement
    });
    test.todo('should reject non-owner with 403 (requires Prisma mock)', async () => {
      // TODO: Mock setlist owned by different user, verify 403
    });
    test.todo('should update setlist for owner (requires Prisma mock)', async () => {
      // TODO: Mock owner, test name/description/guildId updates
    });
  });

  describe('DELETE /setlist/:setlistId - Delete Setlist', () => {
    test.todo('should reject unauthenticated requests with 401', async () => {
      // TODO: Test authentication requirement
    });
    test.todo('should reject non-owner with 403 (requires Prisma mock)', async () => {
      // TODO: Mock setlist owned by different user, verify 403
    });
    test.todo('should cascade delete items, sections, and shares (requires Prisma mock)', async () => {
      // TODO: Mock setlist with items/sections/shares, verify cascade delete
    });
  });

  describe('POST /setlist/:setlistId/duplicate - Duplicate Setlist', () => {
    test.todo('should reject unauthenticated requests with 401', async () => {
      // TODO: Test authentication requirement
    });
    test.todo('should reject if no access (requires Prisma mock)', async () => {
      // TODO: Mock setlist with no access, verify 403
    });
    test.todo('should deep copy setlist with all items and sections (requires Prisma mock)', async () => {
      // TODO: Mock setlist with items/sections, verify copy is identical
    });
    test.todo('should set duplicator as owner of new setlist (requires Prisma mock)', async () => {
      // TODO: Verify new setlist ownerId matches authenticated user
    });
  });
})
