import Elysia from 'elysia';
import { firebaseAuth } from '@/config/firebase-admin.config';

export const firebaseAuthMiddleware = new Elysia()
  .derive(async ({ request, set }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401;
      throw new Error('Unauthorized: No token provided');
    }

    const idToken = authHeader.substring(7);

    try {
      const decodedToken = await firebaseAuth.verifyIdToken(idToken);
      return {
        firebaseUid: decodedToken.uid,
        firebaseEmail: decodedToken.email,
      };
    } catch (error) {
      set.status = 401;
      throw new Error('Unauthorized: Invalid token');
    }
  });

export const firebaseAuthGuard = async ({ firebaseUid, set }: any) => {
  if (!firebaseUid) {
    set.status = 401;
    throw new Error('Unauthorized');
  }
};
