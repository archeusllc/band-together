import { describe, test, beforeEach, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { authRoutes } from './auth.routes';

const createElysia = () => new Elysia()
  .use(authRoutes);

let app = createElysia();

beforeEach(() => {
  app = createElysia();
});

const URL = `${process.env.BUN_TEST_HOST || 'http://localhost:3000'}`;

describe('Authentication Routes', () => {
  describe('POST /auth/register', () => {
    test('should validate required fields (firebaseUid, idToken)', async () => {
      const response = await app.handle(new Request(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          displayName: 'Test User',
          // missing firebaseUid and idToken
        })
      }));
      expect(response.status).toBe(422);
    });

    test('should reject invalid Firebase token', async () => {
      const response = await app.handle(new Request(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          displayName: 'Test User',
          firebaseUid: 'firebase-uid-123',
          idToken: 'invalid-token',
        })
      }));
      // Firebase token verification fails with 400
      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    test('should validate required fields (firebaseUid, idToken)', async () => {
      const response = await app.handle(new Request(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // missing firebaseUid and idToken
        })
      }));
      expect(response.status).toBe(422);
    });

    test('should reject invalid Firebase token', async () => {
      const response = await app.handle(new Request(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: 'firebase-uid-123',
          idToken: 'invalid-token',
        })
      }));
      // Firebase token verification fails with 401
      expect(response.status).toBe(401);
    });
  });

  describe('GET /auth/logout', () => {
    test('should return success on logout', async () => {
      const response = await app.handle(new Request(`${URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }));
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('success');
      expect(data.success).toBe(true);
    });
  });

  describe('POST /auth/reset', () => {
    test('should validate required fields (email)', async () => {
      const response = await app.handle(new Request(`${URL}/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // missing email
        })
      }));
      expect(response.status).toBe(422);
    });

    test('should accept valid reset email', async () => {
      const response = await app.handle(new Request(`${URL}/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
        })
      }));
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('success');
    });
  });

  describe('GET /auth/me', () => {
    test('should reject unauthenticated requests', async () => {
      const response = await app.handle(new Request(`${URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // no Authorization header
        },
      }));
      expect(response.status).toBe(401);
    });

    test('should reject invalid Bearer token', async () => {
      const response = await app.handle(new Request(`${URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer invalid-token',
        },
      }));
      // Firebase token verification fails with 401
      expect(response.status).toBe(401);
    });
  });
});
