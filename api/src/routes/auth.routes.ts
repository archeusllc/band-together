import Elysia, { t } from 'elysia';
import { authController } from '@controllers';

export const authRoutes = new Elysia().group('/auth', (authRoute) =>
  authRoute
    .post(
      '/register',
      async ({ body, set }) => {
        try {
          const user = await authController.register(body);
          return { user };
        } catch (error) {
          set.status = 400;
          return { error: (error as Error).message };
        }
      },
      {
        body: t.Object({
          email: t.String(),
          displayName: t.Optional(t.String()),
          firebaseUid: t.String(),
          idToken: t.String(),
        }),
        detail: {
          tags: ['Authentication'],
          summary: 'Register New User',
          description: 'Create a new user account using Firebase authentication. Accepts user email, display name, Firebase UID, and ID token.',
          responses: {
            200: {
              description: 'User successfully registered',
            },
            400: {
              description: 'Bad request - invalid input or registration failed',
            },
          },
        },
      }
    )
    .post(
      '/login',
      async ({ body, set }) => {
        try {
          const user = await authController.login(body);
          return { user };
        } catch (error) {
          set.status = 401;
          return { error: (error as Error).message };
        }
      },
      {
        body: t.Object({
          firebaseUid: t.String(),
          idToken: t.String(),
        }),
        detail: {
          tags: ['Authentication'],
          summary: 'User Login',
          description: 'Authenticate an existing user using Firebase UID and ID token. Returns authenticated user object on success.',
          responses: {
            200: {
              description: 'User successfully authenticated',
            },
            401: {
              description: 'Unauthorized - invalid Firebase credentials',
            },
          },
        },
      }
    )
    .get(
      '/logout',
      async () => {
        await authController.logout();
        return { success: true };
      },
      {
        detail: {
          tags: ['Authentication'],
          summary: 'User Logout',
          description: 'Log out the currently authenticated user and clear their session.',
          responses: {
            200: {
              description: 'User successfully logged out',
            },
          },
        },
      }
    )
    .post(
      '/reset',
      async ({ body }) => {
        const success = await authController.resetPassword(body.email);
        return { success };
      },
      {
        body: t.Object({ email: t.String() }),
        detail: {
          tags: ['Authentication'],
          summary: 'Request Password Reset',
          description: 'Initiate a password reset process by sending a reset email to the specified address. The email will contain a link to set a new password.',
          responses: {
            200: {
              description: 'Password reset email sent successfully',
            },
            400: {
              description: 'Bad request - invalid email or reset failed',
            },
          },
        },
      }
    )
    .get(
      '/me',
      async ({ request, set }) => {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          set.status = 401;
          return { error: 'Unauthorized: No token provided' };
        }

        const idToken = authHeader.substring(7);

        try {
          // Import firebase auth here to verify token
          const { firebaseAuth } = await import('@config/firebase-admin.config');
          const decodedToken = await firebaseAuth.verifyIdToken(idToken);
          const user = await authController.me(decodedToken.uid);
          return user;
        } catch (error) {
          set.status = 401;
          return { error: (error as Error).message };
        }
      },
      {
        detail: {
          tags: ['Authentication'],
          summary: 'Get Current User',
          description: 'Retrieve the profile of the currently authenticated user. Requires valid Firebase ID token in Authorization header (Bearer token).',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Current user profile retrieved',
            },
            401: {
              description: 'Unauthorized - missing or invalid Firebase ID token',
            },
          },
        },
      }
    )
);
