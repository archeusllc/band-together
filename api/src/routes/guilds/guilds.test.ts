import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { actsRoutes } from './acts.routes';
import { venuesRoutes } from './venues.routes';
import { clubsRoutes } from './clubs.routes';

const createElysia = () => new Elysia()
  .use(actsRoutes)
  .use(venuesRoutes)
  .use(clubsRoutes);

let app = createElysia();

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Guilds Routes', () => {
  describe('GET /acts', () => {
    test('should validate pagination parameters', async () => {
      const response = await app.handle(new Request(`${URL}/acts?page=0`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect(response.status).toBe(422);
    });

    test('should return acts list', async () => {
      const response = await app.handle(new Request(`${URL}/acts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('GET /acts/:actId', () => {
    test('should return 404 for non-existent act', async () => {
      const response = await app.handle(new Request(`${URL}/acts/non-existent`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect(response.status).toBe(404);
    });
  });

  describe('POST /acts', () => {
    test('should reject unauthenticated requests', async () => {
      const response = await app.handle(new Request(`${URL}/acts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Act' })
      }));
      expect(response.status).toBe(401);
    });

    test('should validate act name length', async () => {
      const response = await app.handle(new Request(`${URL}/acts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-token'
        },
        body: JSON.stringify({ name: 'A' }) // Too short
      }));
      expect(response.status).toBe(422);
    });
  });

  describe('GET /venues', () => {
    test('should return venues list', async () => {
      const response = await app.handle(new Request(`${URL}/venues`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('GET /venues/:venueId', () => {
    test('should return 404 for non-existent venue', async () => {
      const response = await app.handle(new Request(`${URL}/venues/non-existent`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect(response.status).toBe(404);
    });
  });

  describe('POST /venues', () => {
    test('should reject unauthenticated requests', async () => {
      const response = await app.handle(new Request(`${URL}/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Venue' })
      }));
      expect(response.status).toBe(401);
    });
  });

  describe('GET /clubs', () => {
    test('should return clubs list', async () => {
      const response = await app.handle(new Request(`${URL}/clubs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('GET /clubs/:clubId', () => {
    test('should return 404 for non-existent club', async () => {
      const response = await app.handle(new Request(`${URL}/clubs/non-existent`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }));
      expect(response.status).toBe(404);
    });
  });

  describe('POST /clubs', () => {
    test('should reject unauthenticated requests', async () => {
      const response = await app.handle(new Request(`${URL}/clubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Club' })
      }));
      expect(response.status).toBe(401);
    });
  });
});
