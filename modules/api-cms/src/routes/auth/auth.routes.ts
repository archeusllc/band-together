import { Elysia } from 'elysia';
import { authController, LoginRequest, AuthError } from './auth.controller';
import { jwtMiddleware } from '@middleware/jwt.middleware';
import { requireAuth } from '@middleware/jwt.middleware';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .error({
    AUTH_ERROR: AuthError,
  })
  .onError(({ code, error, set }) => {
    if (error instanceof AuthError) {
      set.status = error.statusCode;
      return { error: error.message };
    }
  })
  .use(jwtMiddleware)
  .post(
    '/login',
    async ({ body, jwt, set }) => {
      const loginRequest = body as any;
      const result = await authController.login({
        email: loginRequest?.email,
        password: loginRequest?.password,
      });

      // Generate JWT token
      const token = await jwt.sign({
        adminUserId: result.admin.adminUserId,
        email: result.admin.email,
      });

      set.status = 200;
      return {
        token,
        admin: result.admin,
      };
    },
    {
      detail: {
        tags: ['Authentication'],
        summary: 'Admin login',
        description: 'Login with email and password to receive JWT token',
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
          422: { description: 'Missing required fields' },
        },
      },
    }
  )
  .use(requireAuth)
  .get(
    '/me',
    async ({ admin }) => {
      return authController.getMe(admin.adminUserId);
    },
    {
      detail: {
        tags: ['Authentication'],
        summary: 'Get current admin user',
        description: 'Get information about the authenticated admin user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Current admin user info' },
          401: { description: 'Unauthorized' },
          404: { description: 'Admin user not found' },
        },
      },
    }
  )
  .post(
    '/logout',
    () => {
      // Logout is client-side: delete the token from localStorage
      return { message: 'Logout successful' };
    },
    {
      detail: {
        tags: ['Authentication'],
        summary: 'Admin logout',
        description: 'Logout (client should delete the JWT token)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Logout successful' },
        },
      },
    }
  );
