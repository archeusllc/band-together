import Elysia, { t } from 'elysia';
import { feedController } from '@controllers';
import { firebaseGate, firebaseMiddleware } from '@middleware';

export const eventsRoutes = new Elysia()
  // Protected endpoint - requires authentication
  .group('/events', (eventsRoute) =>
    eventsRoute
      .use(firebaseGate)
      .get(
        '/',
        async ({ firebase, query }) => {
          return await feedController.getEvents(firebase.uid, query);
        },
        {
          query: t.Object({
            page: t.Optional(t.Number({ minimum: 1 })),
            limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
            startDate: t.Optional(t.String({ format: 'date-time' })),
            endDate: t.Optional(t.String({ format: 'date-time' })),
            venueId: t.Optional(t.String()),
            actId: t.Optional(t.String())
          }),
          detail: {
            tags: ['Events'],
            summary: 'Get Calendar Events',
            description: 'Retrieve calendar events with optional filtering by date range, venue, or act. Returns upcoming events by default.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Events retrieved successfully',
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
              401: { description: 'Unauthorized' },
              500: { description: 'Server error' }
            }
          }
        }
      )
  )
  // Optional auth endpoint - works for both authenticated and unauthenticated users
  .group('/events', (eventsRoute) =>
    eventsRoute
      .use(firebaseMiddleware)
      .get(
        '/:eventId',
        async ({ firebase, set, params }) => {
          try {
            const result = await feedController.getEventById(firebase?.uid || null, params.eventId);
            return result;
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('not found')) {
              set.status = 404;
            } else {
              set.status = 500;
            }
            return { error: message };
          }
        },
        {
          params: t.Object({
            eventId: t.String()
          }),
          detail: {
            tags: ['Events'],
            summary: 'Get Event by ID',
            description: 'Retrieve a single event with full details including venue and acts with guild relations. Works for both authenticated and unauthenticated users.',
            responses: {
              200: { description: 'Event retrieved successfully' },
              404: { description: 'Event not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
  );
