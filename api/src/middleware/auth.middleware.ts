import jwt from '@elysiajs/jwt';
import Elysia from 'elysia';

const { JWT_SECRET } = process.env;

if (JWT_SECRET === undefined) {
  throw new Error('💥 JWT_SECRET is not defined in environment variables');
}

export const authMiddleware = new Elysia()
  .use(
    jwt({
      secret: JWT_SECRET
    })
  )

export const authGuard = async ({ jwt, cookie }: any) => {
  const authorized = await jwt.verify(cookie.token.value);
  if (!authorized) throw new Error('Unauthorized');
}
