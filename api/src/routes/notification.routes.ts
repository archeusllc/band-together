import Elysia, { t } from 'elysia';
import { notificationController } from '@controllers';
import { firebaseAuthMiddleware, firebaseAuthGuard } from '@middleware';

export const notificationRoutes = new Elysia()
  .use(firebaseAuthMiddleware)
  .group('/notifications', (notifRoute) =>
    notifRoute
      .post(
        '/register',
        async ({ body, firebaseUid, set }) => {
          try {
            await firebaseAuthGuard({ firebaseUid, set });
            await notificationController.registerToken(body);
            return { success: true };
          } catch (error) {
            set.status = 400;
            return { error: (error as Error).message };
          }
        },
        {
          body: t.Object({
            userId: t.String(),
            token: t.String(),
            platform: t.Union([t.Literal('ANDROID'), t.Literal('WEB')]),
            deviceId: t.Optional(t.String()),
          }),
        }
      )
      .post(
        '/unregister',
        async ({ body, firebaseUid, set }) => {
          try {
            await firebaseAuthGuard({ firebaseUid, set });
            await notificationController.unregisterToken(body.token);
            return { success: true };
          } catch (error) {
            set.status = 400;
            return { error: (error as Error).message };
          }
        },
        {
          body: t.Object({
            token: t.String(),
          }),
        }
      )
      .post(
        '/send',
        async ({ body, firebaseUid, set }) => {
          try {
            await firebaseAuthGuard({ firebaseUid, set });
            await notificationController.sendNotification(body);
            return { success: true };
          } catch (error) {
            set.status = 400;
            return { error: (error as Error).message };
          }
        },
        {
          body: t.Object({
            userId: t.String(),
            title: t.String(),
            body: t.String(),
            data: t.Optional(t.Record(t.String(), t.Any())),
          }),
        }
      )
  );
