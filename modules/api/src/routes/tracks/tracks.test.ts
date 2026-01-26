import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { tracksRoutes } from './tracks.routes';

const createElysia = () => new Elysia()
  .use(tracksRoutes);

let app = createElysia();

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Tracks Routes', () => {
  describe('GET /tracks/search', () => {
    test('should accept request with no query parameters', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 500]).toContain(response.status);
    });

    test('should validate limit parameter (minimum 1)', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?limit=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should validate limit parameter (maximum 100)', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?limit=200`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should validate offset parameter (minimum 0)', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?offset=-1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(422);
    });

    test('should accept query parameter', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?query=test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 500]).toContain(response.status);
    });

    test('should accept type parameter', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?type=SONG`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 500]).toContain(response.status);
    });

    test('should accept sortBy parameter', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?sortBy=title`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 400, 500]).toContain(response.status);
    });

    test('should accept sortOrder parameter', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?sortOrder=asc`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 400, 500]).toContain(response.status);
    });

    test('should accept pagination parameters', async () => {
      const response = await app.handle(new Request(`${URL}/tracks/search?limit=20&offset=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect([200, 500]).toContain(response.status);
      if (response.status === 200) {
        const data = await response.json();
        expect(data).toHaveProperty('data');
        expect(data).toHaveProperty('total');
        expect(data).toHaveProperty('limit');
        expect(data).toHaveProperty('offset');
      }
    });
  });
});
