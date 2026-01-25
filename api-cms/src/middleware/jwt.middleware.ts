import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { jwtConfig } from '@config/jwt.config';

export interface JWTPayload {
  adminUserId: string;
  email: string;
}

export const jwtMiddleware = new Elysia({
  name: 'jwt-middleware',
})
  .use(
    jwt({
      name: 'jwt',
      secret: jwtConfig.secret,
    })
  );

// Base middleware - uses 'global' so admin context is available to dependent middleware
const jwtAuthMiddleware = new Elysia({
  name: 'jwt-auth',
})
  .use(jwtMiddleware)
  .derive({
    as: 'global'
  }, async ({ request, jwt, set }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401;
      throw new Error('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);

    try {
      const payload = (await jwt.verify(token)) as unknown as JWTPayload;
      return { admin: payload };
    } catch (err) {
      set.status = 401;
      throw new Error('Invalid or expired token');
    }
  });

// Gate middleware - requires admin context
export const requireAuth = new Elysia()
  .use(jwtAuthMiddleware)
  .derive({
    as: 'scoped'
  }, async ({ admin }) => {
    if (!admin) {
      throw new Error('Unauthorized: No valid token provided');
    }
    return { admin };
  });
