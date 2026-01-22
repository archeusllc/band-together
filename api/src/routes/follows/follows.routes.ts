import Elysia, { t } from 'elysia';
import { followsController } from './follows.controller';
import { firebaseGate } from '@middleware';

export const followsRoutes = new Elysia().group('/follows', (followsRoute) =>
  followsRoute
    .use(firebaseGate)
    .get(
      '/',
      async ({ firebase }) => {
        return await followsController.getFollows(firebase.uid);
      },
      {
        detail: {
          tags: ['Follows'],
          summary: 'Get User Follows',
          description: 'Retrieve all entities (users, tags, guilds) that the authenticated user follows.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Follows retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      follows: { type: 'array', items: { type: 'object' } },
                      total: { type: 'number' }
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
    .post(
      '/',
      async ({ firebase, set, body }) => {
        try {
          const result = await followsController.createFollow(firebase.uid, body);
          set.status = 201;
          return result;
        } catch (error) {
          const message = (error as Error).message;
          if (message.includes('required') || message.includes('Already following')) {
            set.status = 400;
          } else {
            set.status = 500;
          }
          return { error: message };
        }
      },
      {
        body: t.Object({
          entityType: t.Union([
            t.Literal('USER'),
            t.Literal('TAG'),
            t.Literal('GUILD')
          ]),
          followedUserId: t.Optional(t.String()),
          tagId: t.Optional(t.String()),
          guildId: t.Optional(t.String())
        }),
        detail: {
          tags: ['Follows'],
          summary: 'Follow Entity',
          description: 'Follow a user, tag, or guild. Exactly one of followedUserId, tagId, or guildId must be provided based on entityType.',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Follow created successfully' },
            400: { description: 'Invalid request - missing required ID or already following' },
            401: { description: 'Unauthorized' },
            500: { description: 'Server error' }
          }
        }
      }
    )
    .delete(
      '/:followId',
      async ({ firebase, set, params }) => {
        try {
          const result = await followsController.deleteFollow(firebase.uid, params.followId);
          return result;
        } catch (error) {
          const message = (error as Error).message;
          if (message.includes('not found')) {
            set.status = 404;
          } else if (message.includes('Unauthorized')) {
            set.status = 403;
          } else {
            set.status = 500;
          }
          return { error: message };
        }
      },
      {
        params: t.Object({
          followId: t.String()
        }),
        detail: {
          tags: ['Follows'],
          summary: 'Unfollow Entity',
          description: 'Remove a follow relationship by follow ID. User must own the follow.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Follow deleted successfully' },
            403: { description: 'Forbidden - cannot delete another user\'s follow' },
            404: { description: 'Follow not found' },
            401: { description: 'Unauthorized' },
            500: { description: 'Server error' }
          }
        }
      }
    )
);
