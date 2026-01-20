import Elysia from 'elysia';
import { firebaseAuth } from '@config/firebase-admin.config';

/** For endpoints that may use Firebase authentication, but don't necessarily require it */
export const firebaseMiddleware = new Elysia({
  name: 'firebase'
})
  .derive({
    as: 'scoped'
  }, async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return;
    const decoded = await firebaseAuth.verifyIdToken(authHeader.substring(7))

    return {
      firebase: {
        uid: decoded.uid,
        email: decoded.email,
      }
    }
  })

/** For endpoints that require a valid Firebase authentication token */
export const firebaseGate = new Elysia()
  .use(firebaseMiddleware)
  .derive({
    as: 'scoped'
  }, async ({ firebase }) => {
    if (!firebase) {
      throw new Error('Unauthorized: No valid Firebase token provided');
    }
    return { firebase }
  })
