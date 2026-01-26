import Elysia, { t } from 'elysia';
import { authController } from './auth.controller';
import { firebaseGate } from '@middleware';

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
          description: 'Authenticate a user using Firebase UID and ID token. If the user exists in Firebase but not in the database, a database record is automatically created. Returns authenticated user object on success.',
          responses: {
            200: {
              description: 'User successfully authenticated. Returns existing user or creates new database record for valid Firebase user.',
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
    .use(firebaseGate)
    .get(
      '/me',
      async ({ firebase }) => {
        return await authController.me(firebase.uid);
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
