import { describe, test, beforeEach, expect, mock } from 'bun:test';
import { Elysia } from 'elysia';

import { setlistRoutes } from './setlist.routes';

const createElysia = () => new Elysia()
  .use(setlistRoutes);

let app = createElysia()

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Setlists CRUD', () => {
  describe('POST /setlist', () => {
    test('should reject unauthenticated requests', async () => {
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

    test('should validate required fields (name)', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
        body: JSON.stringify({
          description: 'A cool setlist without a name',
          isPublic: true,
          actId: 'some-act-id',
        })
      }));
      expect(response.status).toBe(422);
    });

    test('should create a new private setlist for an authenticated user', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
        body: JSON.stringify({
          name: 'My Setlist',
        })
      }));
      expect(response.status).toBe(201);
    });

    test('should create a new private setlist with an Act association if an actId is provided', async () => {
      const response = await app.handle(new Request(`${URL}/setlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
        body: JSON.stringify({
          name: 'My Setlist',
          actId: 'some-act-id',
        })
      }));
      expect(response.status).toBe(201);
    });

  });
})
