import Elysia from 'elysia';
import { firebaseAuth } from '@config/firebase-admin.config';
import { prisma } from '@services/prisma.service';

/** For endpoints that may use Firebase authentication, but don't necessarily require it */
export const firebaseMiddleware = new Elysia({
  name: 'firebase'
})
  .derive({
    as: 'global'
  }, async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return;

    try {
      const token = authHeader.substring(7);
      const decoded = await firebaseAuth.verifyIdToken(token)
      console.log('🔐 Firebase token verified for UID:', decoded.uid);

      // Auto-create user if they don't exist in database
      // This handles users who were logged in before the login endpoint was implemented
      let user = await prisma.user.findUnique({
        where: { firebaseUid: decoded.uid },
      });

      if (!user && decoded.email) {
        console.log('👤 Creating new user for UID:', decoded.uid, 'Email:', decoded.email);
        user = await prisma.user.create({
          data: {
            firebaseUid: decoded.uid,
            email: decoded.email,
            displayName: decoded.name || decoded.email.split('@')[0],
          },
        });
        console.log('✅ User created successfully:', user.userId);
      } else if (user) {
        console.log('✅ User already exists:', user.userId);
      }

      return {
        firebase: {
          uid: decoded.uid,
          email: decoded.email,
        }
      }
    } catch (error) {
      console.error('❌ Firebase token verification failed:', error instanceof Error ? error.message : error);
      console.error('Full error:', error);
      return;
    }
  })

/** For endpoints that require a valid Firebase authentication token */
export const firebaseGate = new Elysia()
  .use(firebaseMiddleware)
  .derive({
    as: 'scoped'
  }, async ({ firebase }) => {
    if (!firebase) {
      throw new Response('Unauthorized: No valid Firebase token provided', { status: 401 });
    }
    return { firebase }
  })
