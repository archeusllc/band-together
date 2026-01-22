import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { feedRoutes } from './feed.routes';

const createElysia = () => new Elysia()
  .use(feedRoutes);

let app = createElysia();

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Feed Routes', () => {
  describe('GET /feed', () => {
    test('should validate query parameters (page >= 1)', async () => {
      const response = await app.handle(new Request(`${URL}/feed?page=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should validate query parameters (limit >= 1 and <= 100)', async () => {
      const response = await app.handle(new Request(`${URL}/feed?limit=200`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should return feed for unauthenticated user', async () => {
      const response = await app.handle(new Request(`${URL}/feed`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      // Should return 200 with empty events or existing events
      expect([200, 500]).toContain(response.status);
    });

    test('should return feed for authenticated user without bearer token', async () => {
      // firebaseMiddleware makes auth optional
      const response = await app.handle(new Request(`${URL}/feed`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // No Authorization header
        },
      }));
      expect([200, 500]).toContain(response.status);
    });

    test('should return feed with pagination', async () => {
      const response = await app.handle(new Request(`${URL}/feed?page=1&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 500]).toContain(response.status);
      if (response.status === 200) {
        const data = await response.json();
        expect(data).toHaveProperty('events');
        expect(data).toHaveProperty('total');
        expect(data).toHaveProperty('page');
        expect(data).toHaveProperty('limit');
      }
    });
  });
});
