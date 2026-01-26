import Elysia, { t } from 'elysia';
import { guildsController } from './guilds.controller';
import { GuildType } from '@archeusllc/types';
import { firebaseGate } from '@middleware';

export const venuesRoutes = new Elysia()
  .group('/venues', (route) =>
    route
      // GET /venues - List all venues (public)
      .get(
        '/',
        async ({ set, query }: any) => {
          try {
            const result = await guildsController.getGuilds(GuildType.VENUE, query);
            return result;
          } catch (error) {
            set.status = 500;
            return { error: (error as Error).message };
          }
        },
        {
          query: t.Object({
            page: t.Optional(t.Number({ minimum: 1 })),
            limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
            search: t.Optional(t.String({ minLength: 1 }))
          }),
          detail: {
            tags: ['Venues'],
            summary: 'List Venues',
            description: 'Retrieve paginated list of venues with optional search. Public endpoint.',
            responses: {
              200: {
                description: 'Venues retrieved successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        guilds: { type: 'array', items: { type: 'object' } },
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
      // GET /venues/:venueId - Get single venue (public)
      .get(
        '/:venueId',
        async ({ set, params }: any) => {
          try {
            const result = await guildsController.getGuildById(params.venueId);
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
            venueId: t.String()
          }),
          detail: {
            tags: ['Venues'],
            summary: 'Get Venue by ID',
            description: 'Retrieve a single venue with full details including owner and members. Public endpoint.',
            responses: {
              200: { description: 'Venue retrieved successfully' },
              404: { description: 'Venue not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // Authenticated routes - require valid Firebase token
      .use(firebaseGate)
      // POST /venues - Create new venue (authenticated)
      .post(
        '/',
        async ({ firebase, set, body }: any) => {
          try {
            const result = await guildsController.createVenue(firebase.uid, body);
            set.status = 201;
            return result;
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 401;
            } else if (message.includes('must be between')) {
              set.status = 400;
            } else {
              set.status = 500;
            }
            return { error: message };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 2, maxLength: 100 }),
            address: t.Optional(t.String({ maxLength: 200 })),
            city: t.Optional(t.String({ maxLength: 100 })),
            state: t.Optional(t.String({ maxLength: 50 })),
            zipCode: t.Optional(t.String({ maxLength: 20 })),
            avatar: t.Optional(t.String())
          }),
          detail: {
            tags: ['Venues'],
            summary: 'Create Venue',
            description: 'Create a new venue with associated guild. Creator becomes owner. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: { description: 'Venue created successfully' },
              400: { description: 'Invalid input data' },
              401: { description: 'Unauthorized' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // PATCH /venues/:venueId - Update venue (owner only)
      .patch(
        '/:venueId',
        async ({ firebase, set, params, body }: any) => {
          try {
            const result = await guildsController.updateVenue(firebase.uid, params.venueId, body);
            return result;
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found')) {
              set.status = 404;
            } else if (message.includes('must be between')) {
              set.status = 400;
            } else {
              set.status = 500;
            }
            return { error: message };
          }
        },
        {
          params: t.Object({
            venueId: t.String()
          }),
          body: t.Object({
            name: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
            address: t.Optional(t.String({ maxLength: 200 })),
            city: t.Optional(t.String({ maxLength: 100 })),
            state: t.Optional(t.String({ maxLength: 50 })),
            zipCode: t.Optional(t.String({ maxLength: 20 })),
            avatar: t.Optional(t.String())
          }),
          detail: {
            tags: ['Venues'],
            summary: 'Update Venue',
            description: 'Update venue details. Only venue owner can update. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Venue updated successfully' },
              400: { description: 'Invalid input data' },
              403: { description: 'Forbidden - not venue owner' },
              404: { description: 'Venue not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // DELETE /venues/:venueId - Delete venue (owner only)
      .delete(
        '/:venueId',
        async ({ firebase, set, params }: any) => {
          try {
            const result = await guildsController.deleteGuild(firebase.uid, params.venueId);
            return result;
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found')) {
              set.status = 404;
            } else {
              set.status = 500;
            }
            return { error: message };
          }
        },
        {
          params: t.Object({
            venueId: t.String()
          }),
          detail: {
            tags: ['Venues'],
            summary: 'Delete Venue',
            description: 'Delete venue and associated guild. Only venue owner can delete. This action cannot be undone. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Venue deleted successfully' },
              403: { description: 'Forbidden - not venue owner' },
              404: { description: 'Venue not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
  );
