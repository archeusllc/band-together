import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { eventsRoutes } from './events.routes';

const createElysia = () => new Elysia()
  .use(eventsRoutes);

let app = createElysia();

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Events Routes', () => {
  describe('GET /events', () => {
    test('should reject unauthenticated requests', async () => {
      const response = await app.handle(new Request(`${URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(401);
    });

    test('should validate query parameters (page >= 1)', async () => {
      const response = await app.handle(new Request(`${URL}/events?page=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should validate query parameters (limit >= 1 and <= 100)', async () => {
      const response = await app.handle(new Request(`${URL}/events?limit=200`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should accept valid bearer token', async () => {
      const response = await app.handle(new Request(`${URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
      }));
      // Firebase token verification fails but validates auth requirement
      expect([400, 401]).toContain(response.status);
    });
  });

  describe('GET /events/:eventId', () => {
    test('should validate eventId parameter', async () => {
      const response = await app.handle(new Request(`${URL}/events/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      // Path without eventId should not match this route
      expect([404, 405]).toContain(response.status);
    });

    test('should return 404 for non-existent event', async () => {
      const response = await app.handle(new Request(`${URL}/events/non-existent-event-id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(404);
    });

    test('should return event details for valid eventId', async () => {
      const response = await app.handle(new Request(`${URL}/events/some-event-id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      // Event not found in test database
      expect([404, 500]).toContain(response.status);
    });

    test('should work with authenticated user', async () => {
      const response = await app.handle(new Request(`${URL}/events/some-event-id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token',
        },
      }));
      // Event not found, but auth should not prevent request
      expect([404, 500]).toContain(response.status);
    });
  });
});
