import Elysia, { t } from 'elysia';
import { feedController } from '@controllers';
import { optionalFirebaseAuthMiddleware } from '@middleware';

export const feedRoutes = new Elysia().group('/feed', (feedRoute) =>
  feedRoute
    .use(optionalFirebaseAuthMiddleware)
    .get(
      '/',
      async ({ firebaseUid, set, query }) => {
        try {
          // Feed is public - works for both authenticated and unauthenticated users
          const result = await feedController.getFeed(firebaseUid || null, query);
          return result;
        } catch (error) {
          set.status = 500;
          return { error: (error as Error).message };
        }
      },
      {
        query: t.Object({
          page: t.Optional(t.Number({ minimum: 1 })),
          limit: t.Optional(t.Number({ minimum: 1, maximum: 100 }))
        }),
        detail: {
          tags: ['Feed'],
          summary: 'Get Activity Feed',
          description: 'Retrieve activity feed showing upcoming events. For authenticated users with follows, shows personalized events from followed acts/venues/tags. For unauthenticated users or users without follows, shows popular upcoming events. Authentication is optional.',
          responses: {
            200: {
              description: 'Feed retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      events: { type: 'array' },
                      total: { type: 'number' },
                      page: { type: 'number' },
                      limit: { type: 'number' }
                    }
                  }
                }
              }
            },
            500: { description: 'Server error' }
          }
        }
      }
    )
);
