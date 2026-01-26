import { mock } from 'bun:test';

mock.module('@config/firebase-admin.config', () => ({
  firebaseAdmin: {},
  firebaseAuth: {
    verifyIdToken: async (token: string) => {
      if (token === 'valid-token') {
        return { uid: 'test-uid', email: 'test@example.com' };
      }
      throw new Response('Invalid token', { status: 401 });
    }
  },
}))