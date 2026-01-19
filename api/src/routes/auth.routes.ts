import Elysia, { t } from 'elysia';
import { authController } from '@controllers';
import { firebaseAuthMiddleware, firebaseAuthGuard } from '@middleware';

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
      }
    )
    .use(firebaseAuthMiddleware)
    .get(
      '/me',
      async ({ firebaseUid, set }) => {
        try {
          await firebaseAuthGuard({ firebaseUid, set });
          const user = await authController.me(firebaseUid);
          return user;
        } catch (error) {
          set.status = 401;
          return { error: (error as Error).message };
        }
      }
    )
    .get('/logout', async () => {
      await authController.logout();
      return { success: true };
    })
    .post(
      '/reset',
      async ({ body }) => {
        const success = await authController.resetPassword(body.email);
        return { success };
      },
      {
        body: t.Object({ email: t.String() }),
      }
    )
);
