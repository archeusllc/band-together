import Elysia, { t } from 'elysia';
import { guildController } from '@controllers';
import { GuildType } from '@band-together/shared';
import { firebaseGate } from '@middleware';

export const clubsRoutes = new Elysia()
  .group('/clubs', (route) =>
    route
      // GET /clubs - List all clubs (public)
      .get(
        '/',
        async ({ set, query }: any) => {
          try {
            const result = await guildController.getGuilds(GuildType.CLUB, query);
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
            tags: ['Clubs'],
            summary: 'List Clubs',
            description: 'Retrieve paginated list of clubs with optional search. Public endpoint.',
            responses: {
              200: {
                description: 'Clubs retrieved successfully',
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
      // GET /clubs/:clubId - Get single club (public)
      .get(
        '/:clubId',
        async ({ set, params }: any) => {
          try {
            const result = await guildController.getGuildById(params.clubId);
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
            clubId: t.String()
          }),
          detail: {
            tags: ['Clubs'],
            summary: 'Get Club by ID',
            description: 'Retrieve a single club with full details including owner and members. Public endpoint.',
            responses: {
              200: { description: 'Club retrieved successfully' },
              404: { description: 'Club not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // Authenticated routes - require valid Firebase token
      .use(firebaseGate)
      // POST /clubs - Create new club (authenticated)
      .post(
        '/',
        async ({ firebase, set, body }: any) => {
          try {
            const result = await guildController.createClub(firebase.uid, body);
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
            description: t.Optional(t.String({ maxLength: 1000 })),
            avatar: t.Optional(t.String())
          }),
          detail: {
            tags: ['Clubs'],
            summary: 'Create Club',
            description: 'Create a new club with associated guild. Creator becomes owner. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: { description: 'Club created successfully' },
              400: { description: 'Invalid input data' },
              401: { description: 'Unauthorized' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // PATCH /clubs/:clubId - Update club (owner only)
      .patch(
        '/:clubId',
        async ({ firebase, set, params, body }: any) => {
          try {
            const result = await guildController.updateClub(firebase.uid, params.clubId, body);
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
            clubId: t.String()
          }),
          body: t.Object({
            name: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
            description: t.Optional(t.String({ maxLength: 1000 })),
            avatar: t.Optional(t.String())
          }),
          detail: {
            tags: ['Clubs'],
            summary: 'Update Club',
            description: 'Update club details. Only club owner can update. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Club updated successfully' },
              400: { description: 'Invalid input data' },
              403: { description: 'Forbidden - not club owner' },
              404: { description: 'Club not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
      // DELETE /clubs/:clubId - Delete club (owner only)
      .delete(
        '/:clubId',
        async ({ firebase, set, params }: any) => {
          try {
            const result = await guildController.deleteGuild(firebase.uid, params.clubId);
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
            clubId: t.String()
          }),
          detail: {
            tags: ['Clubs'],
            summary: 'Delete Club',
            description: 'Delete club and associated guild. Only club owner can delete. This action cannot be undone. Requires authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Club deleted successfully' },
              403: { description: 'Forbidden - not club owner' },
              404: { description: 'Club not found' },
              500: { description: 'Server error' }
            }
          }
        }
      )
  );
