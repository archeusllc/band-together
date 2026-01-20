import Elysia, { t } from 'elysia';
import { guildController } from '@controllers';
import { firebaseAuthMiddleware, firebaseAuthGuard, optionalFirebaseAuthMiddleware } from '@middleware';
import { GuildType } from '@band-together/shared';

export const actsRoutes = new Elysia().group('/acts', (actsRoute) =>
  actsRoute
    // GET /acts - List all acts (public)
    .use(optionalFirebaseAuthMiddleware)
    .get(
      '/',
      async ({ set, query }) => {
        try {
          const result = await guildController.getGuilds(GuildType.ACT, query);
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
          tags: ['Acts'],
          summary: 'List Acts',
          description: 'Retrieve paginated list of acts with optional search. Public endpoint.',
          responses: {
            200: {
              description: 'Acts retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      guilds: { type: 'array' },
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
    // GET /acts/:actId - Get single act (public)
    .get(
      '/:actId',
      async ({ set, params }) => {
        try {
          const result = await guildController.getGuildById(params.actId);
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
          actId: t.String()
        }),
        detail: {
          tags: ['Acts'],
          summary: 'Get Act by ID',
          description: 'Retrieve a single act with full details including owner and members. Public endpoint.',
          responses: {
            200: { description: 'Act retrieved successfully' },
            404: { description: 'Act not found' },
            500: { description: 'Server error' }
          }
        }
      }
    )
    // POST /acts - Create new act (authenticated)
    .use(firebaseAuthMiddleware)
    .post(
      '/',
      async ({ firebaseUid, set, body }) => {
        try {
          await firebaseAuthGuard({ firebaseUid, set });
          const result = await guildController.createAct(firebaseUid, body);
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
          bio: t.Optional(t.String({ maxLength: 500 })),
          avatar: t.Optional(t.String())
        }),
        detail: {
          tags: ['Acts'],
          summary: 'Create Act',
          description: 'Create a new act with associated guild. Creator becomes owner. Requires authentication.',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Act created successfully' },
            400: { description: 'Invalid input data' },
            401: { description: 'Unauthorized' },
            500: { description: 'Server error' }
          }
        }
      }
    )
    // PATCH /acts/:actId - Update act (owner only)
    .patch(
      '/:actId',
      async ({ firebaseUid, set, params, body }) => {
        try {
          await firebaseAuthGuard({ firebaseUid, set });
          const result = await guildController.updateAct(firebaseUid, params.actId, body);
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
          actId: t.String()
        }),
        body: t.Object({
          name: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
          bio: t.Optional(t.String({ maxLength: 500 })),
          avatar: t.Optional(t.String())
        }),
        detail: {
          tags: ['Acts'],
          summary: 'Update Act',
          description: 'Update act details. Only act owner can update. Requires authentication.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Act updated successfully' },
            400: { description: 'Invalid input data' },
            403: { description: 'Forbidden - not act owner' },
            404: { description: 'Act not found' },
            500: { description: 'Server error' }
          }
        }
      }
    )
    // DELETE /acts/:actId - Delete act (owner only)
    .delete(
      '/:actId',
      async ({ firebaseUid, set, params }) => {
        try {
          await firebaseAuthGuard({ firebaseUid, set });
          const result = await guildController.deleteGuild(firebaseUid, params.actId);
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
          actId: t.String()
        }),
        detail: {
          tags: ['Acts'],
          summary: 'Delete Act',
          description: 'Delete act and associated guild. Only act owner can delete. This action cannot be undone. Requires authentication.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Act deleted successfully' },
            403: { description: 'Forbidden - not act owner' },
            404: { description: 'Act not found' },
            500: { description: 'Server error' }
          }
        }
      }
    )
);
