import { firebaseGate, firebaseMiddleware } from '@middleware';
import Elysia, { t } from 'elysia';
import { setlistController } from './setlists.controller';

export const setlistRoutes = new Elysia()
  .group('/setlist', (setlistRoute) =>
    setlistRoute
      // Protected routes (require authentication)
      .use(firebaseGate)
      // Create setlist - requires authentication
      .post(
        '/',
        async ({ firebase, body, set }) => {
          try {
            const result = await setlistController.createSetlist(
              firebase.uid,
              {
                name: body.name,
                description: body.description,
                guildId: body.guildId,
              }
            );
            set.status = 201;
            return result;
          } catch (error) {
            set.status = 422;
            return { error: (error as Error).message };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            description: t.Optional(t.String()),
            guildId: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Create Setlist',
            description:
              'Create a new private setlist for the authenticated user. Setlists are always private by design.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: {
                description: 'Setlist successfully created',
              },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase authentication token',
              },
              422: {
                description:
                  'Unprocessable Entity - invalid input data (e.g., missing or empty name)',
              },
            },
          },
        }
      )
      // Get all setlists for authenticated user
      .get(
        '/',
        async ({ firebase, set }) => {
          try {
            return await setlistController.getUserSetlists(firebase.uid);
          } catch (error) {
            set.status = 500;
            return { error: (error as Error).message };
          }
        },
        {
          detail: {
            tags: ['Setlists'],
            summary: 'Get User Setlists',
            description:
              'Get all setlists for the authenticated user, including personal setlists, guild-associated setlists, and setlists shared with the user via tokens.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description:
                  'Setlists retrieved successfully, separated into personal and shared categories',
              },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase authentication token',
              },
              500: {
                description: 'Server error',
              },
            },
          },
        }
      )
      // Update setlist - requires authentication and ownership
      .patch(
        '/:setlistId',
        async ({ firebase, params, body, set }) => {
          try {
            return await setlistController.updateSetlist(
              params.setlistId,
              firebase.uid,
              body
            );
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found')) {
              set.status = 404;
            } else {
              set.status = 422;
            }
            return { error: message };
          }
        },
        {
          params: t.Object({
            setlistId: t.String(),
          }),
          body: t.Object({
            name: t.Optional(t.String()),
            description: t.Optional(t.String()),
            guildId: t.Optional(t.Union([t.String(), t.Null()])),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Update Setlist',
            description: 'Update a setlist. Only the owner can update a setlist.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Setlist updated successfully',
              },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase authentication token',
              },
              403: {
                description: 'Forbidden - only the setlist owner can update it',
              },
              404: {
                description: 'Setlist not found',
              },
              422: {
                description: 'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Delete setlist - requires authentication and ownership
      .delete(
        '/:setlistId',
        async ({ firebase, params, set }) => {
          try {
            return await setlistController.deleteSetlist(
              params.setlistId,
              firebase.uid
            );
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
            setlistId: t.String(),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Delete Setlist',
            description:
              'Delete a setlist and all associated items, sections, and shares. Only the owner can delete a setlist. This action cannot be undone.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description:
                  'Setlist deleted successfully (includes cascade deletion of items, sections, and shares)',
              },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase authentication token',
              },
              403: {
                description: 'Forbidden - only the setlist owner can delete it',
              },
              404: {
                description: 'Setlist not found',
              },
              500: {
                description: 'Server error',
              },
            },
          },
        }
      )
      // Duplicate setlist - requires authentication and access
      .post(
        '/:setlistId/duplicate',
        async ({ firebase, params, set }) => {
          try {
            return await setlistController.duplicateSetlist(
              params.setlistId,
              firebase.uid
            );
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found')) {
              set.status = 404;
            } else {
              set.status = 422;
            }
            return { error: message };
          }
        },
        {
          params: t.Object({
            setlistId: t.String(),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Duplicate Setlist',
            description:
              'Create a copy of a setlist with all its items and sections. The authenticated user becomes the owner of the new setlist. Requires access to the original setlist (owner or guild member).',
            security: [{ bearerAuth: [] }],
            responses: {
              201: {
                description:
                  'Setlist duplicated successfully with all items and sections',
              },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase authentication token',
              },
              403: {
                description:
                  'Forbidden - insufficient permissions to duplicate this setlist',
              },
              404: {
                description: 'Setlist not found',
              },
              422: {
                description: 'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
  )
  .group('/setlist', (setlistRoute) =>
    setlistRoute
      // Semi-protected routes (optional authentication)
      .use(firebaseMiddleware)
      // Get setlist by ID - supports both authenticated and share tokens
      .get(
        '/:setlistId',
        async ({ firebase, params, query, set }) => {
          try {
            return await setlistController.getSetlistById(
              params.setlistId,
              firebase?.uid,
              query.shareToken
            );
          } catch (error) {
            set.status = 404;
            return { error: (error as Error).message };
          }
        },
        {
          params: t.Object({
            setlistId: t.String(),
          }),
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Get Setlist by ID',
            description:
              'Get a setlist by ID. Can be accessed by the owner, guild members, or users with a valid share token. Authentication is optional.',
            responses: {
              200: {
                description: 'Setlist retrieved successfully',
              },
              404: {
                description:
                  'Setlist not found or access denied (private setlist without permission)',
              },
              500: {
                description: 'Server error',
              },
            },
          },
        }
      )
  );
