import { firebaseGate, firebaseMiddleware } from '@middleware';
import Elysia, { t } from 'elysia';
import { setlistController } from './setlists.controller';
import { setlistPresenceService } from '@services/setlist-presence.service';
import { broadcastService } from '@services/broadcast.service';

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
      // Add track to setlist
      .post(
        '/:setlistId/items',
        async ({ firebase, params, query, body, set }) => {
          try {
            const result = await setlistController.addSetItem(
              params.setlistId,
              firebase.uid,
              {
                trackId: body.trackId,
                customTuning: body.customTuning,
                customNotes: body.customNotes,
                customDuration: body.customDuration,
                position: body.position,
                sectionId: body.sectionId,
              },
              query.shareToken
            );
            set.status = 201;
            return result;
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
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            trackId: t.String(),
            customTuning: t.Optional(t.String()),
            customNotes: t.Optional(t.String()),
            customDuration: t.Optional(t.Number()),
            position: t.Optional(t.Number()),
            sectionId: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Add Track to Setlist',
            description:
              'Add a track to a setlist with optional custom overrides (tuning, notes, duration). If position is not provided, track will be appended to the end of the setlist. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: { description: 'Track added to setlist successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Setlist or track not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Update item custom overrides
      .patch(
        '/:setlistId/items/:setItemId',
        async ({ firebase, params, query, body, set }) => {
          try {
            return await setlistController.updateSetItem(
              params.setItemId,
              firebase.uid,
              {
                customTuning: body.customTuning,
                customNotes: body.customNotes,
                customDuration: body.customDuration,
                sectionId: body.sectionId,
              },
              query.shareToken
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
            setItemId: t.String(),
          }),
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            customTuning: t.Optional(t.String()),
            customNotes: t.Optional(t.String()),
            customDuration: t.Optional(t.Number()),
            sectionId: t.Optional(t.Union([t.String(), t.Null()])),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Update SetItem Custom Overrides',
            description:
              'Update custom overrides (tuning, notes, duration) or section assignment for a track in a setlist. Cannot change position (use reorder endpoint) or track (delete and add new instead). Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'SetItem updated successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'SetItem not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Remove track from setlist
      .delete(
        '/:setlistId/items/:setItemId',
        async ({ firebase, params, query, set }) => {
          try {
            return await setlistController.removeSetItem(
              params.setItemId,
              firebase.uid,
              query.shareToken
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
            setItemId: t.String(),
          }),
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Remove Track from Setlist',
            description:
              'Remove a track from a setlist. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Track removed from setlist successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'SetItem not found' },
              500: { description: 'Server error' },
            },
          },
        }
      )
      // Reorder tracks in setlist
      .post(
        '/:setlistId/reorder',
        async ({ firebase, params, query, body, set }) => {
          try {
            return await setlistController.reorderSetItems(
              params.setlistId,
              firebase.uid,
              body.itemPositions,
              query.shareToken
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
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            itemPositions: t.Array(
              t.Object({
                setItemId: t.String(),
                position: t.Number(),
              })
            ),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Reorder Tracks in Setlist',
            description:
              'Update the positions of tracks in a setlist. Provide an array of {setItemId, position} objects. All items must belong to the specified setlist. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Tracks reordered successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Setlist not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Reorder sections in setlist
      .post(
        '/:setlistId/sections/reorder',
        async ({ firebase, params, query, body, set }) => {
          try {
            return await setlistController.reorderSetSections(
              params.setlistId,
              firebase.uid,
              body.sectionPositions,
              query.shareToken
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
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            sectionPositions: t.Array(
              t.Object({
                sectionId: t.String(),
                position: t.Number(),
              })
            ),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Reorder Sections in Setlist',
            description:
              'Update the positions of sections in a setlist. Provide an array of {sectionId, position} objects. All sections must belong to the specified setlist. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Sections reordered successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Setlist not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Add section to setlist
      .post(
        '/:setlistId/sections',
        async ({ firebase, params, query, body, set }) => {
          try {
            const result = await setlistController.addSection(
              params.setlistId,
              firebase.uid,
              {
                name: body.name,
                position: body.position,
              },
              query.shareToken
            );
            set.status = 201;
            return result;
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
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            name: t.String(),
            position: t.Optional(t.Number()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Add Section to Setlist',
            description:
              'Add a new section to a setlist for organizing tracks. If position is not provided, section will be appended to the end. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: { description: 'Section added to setlist successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Setlist not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Update section name
      .patch(
        '/:setlistId/sections/:sectionId',
        async ({ firebase, params, query, body, set }) => {
          try {
            return await setlistController.updateSection(
              params.setlistId,
              params.sectionId,
              firebase.uid,
              {
                name: body.name,
              },
              query.shareToken
            );
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found') || message.includes('does not belong')) {
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
            sectionId: t.String(),
          }),
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          body: t.Object({
            name: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Update Section',
            description:
              'Update a section name. Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Section updated successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Section not found or does not belong to setlist' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // Delete section from setlist
      .delete(
        '/:setlistId/sections/:sectionId',
        async ({ firebase, params, query, set }) => {
          try {
            return await setlistController.deleteSection(
              params.setlistId,
              params.sectionId,
              firebase.uid,
              query.shareToken
            );
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found') || message.includes('does not belong')) {
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
            sectionId: t.String(),
          }),
          query: t.Object({
            shareToken: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Delete Section',
            description:
              'Delete a section from a setlist. Items in the section will be unassigned (sectionId set to null). Requires authentication and ownership or CAN_EDIT share permission.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Section deleted successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - must be owner or have CAN_EDIT share access' },
              404: { description: 'Section not found or does not belong to setlist' },
              500: { description: 'Server error' },
            },
          },
        }
      )
      // Create share for setlist
      .post(
        '/:setlistId/shares',
        async ({ firebase, params, body, set }) => {
          try {
            const result = await setlistController.createShare(
              params.setlistId,
              firebase.uid,
              {
                permission: body.permission,
                expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
              }
            );
            set.status = 201;
            return result;
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
            permission: t.Union([t.Literal('VIEW_ONLY'), t.Literal('CAN_EDIT')]),
            expiresAt: t.Optional(t.String()),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Create Share Link',
            description:
              'Create a shareable link for a setlist with optional expiration date. Returns a unique share token that can be used to access the setlist without authentication.',
            security: [{ bearerAuth: [] }],
            responses: {
              201: { description: 'Share link created successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - only the setlist owner can create shares' },
              404: { description: 'Setlist not found' },
              422: {
                description:
                  'Unprocessable Entity - invalid input data',
              },
            },
          },
        }
      )
      // List all shares for a setlist
      .get(
        '/:setlistId/shares',
        async ({ firebase, params, set }) => {
          try {
            return await setlistController.listShares(params.setlistId, firebase.uid);
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
            summary: 'List Shares',
            description:
              'Get all active share links for a setlist. Only the setlist owner can list shares.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Shares retrieved successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - only the setlist owner can list shares' },
              404: { description: 'Setlist not found' },
              500: { description: 'Server error' },
            },
          },
        }
      )
      // Revoke a share link
      .delete(
        '/:setlistId/shares/:shareId',
        async ({ firebase, params, set }) => {
          try {
            return await setlistController.revokeShare(
              params.setlistId,
              params.shareId,
              firebase.uid
            );
          } catch (error) {
            const message = (error as Error).message;
            if (message.includes('Unauthorized')) {
              set.status = 403;
            } else if (message.includes('not found') || message.includes('does not belong')) {
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
            shareId: t.String(),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Revoke Share',
            description:
              'Revoke a share link for a setlist. Only the setlist owner can revoke shares.',
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: 'Share revoked successfully' },
              401: {
                description:
                  'Unauthorized - missing or invalid Firebase token',
              },
              403: { description: 'Forbidden - only the setlist owner can revoke shares' },
              404: { description: 'Share not found or does not belong to setlist' },
              500: { description: 'Server error' },
            },
          },
        }
      )
  )
  .group('/setlist', (setlistRoute) =>
    setlistRoute
      // Semi-protected routes (optional authentication)
      .use(firebaseMiddleware)
      // Get setlist by share token - public endpoint for shared access
      .get(
        '/by-token/:shareToken',
        async ({ firebase, params, set }) => {
          try {
            return await setlistController.getSetlistByShareToken(
              params.shareToken,
              firebase?.uid
            );
          } catch (error) {
            set.status = 404;
            return { error: (error as Error).message };
          }
        },
        {
          params: t.Object({
            shareToken: t.String(),
          }),
          detail: {
            tags: ['Setlists'],
            summary: 'Get Setlist by Share Token',
            description:
              'Get a setlist using only a share token. Returns full setlist data including setListId, items, and sections. Works with both VIEW_ONLY and CAN_EDIT share tokens. Authentication is optional.',
            responses: {
              200: {
                description: 'Setlist retrieved successfully via share token',
              },
              404: {
                description:
                  'Share token not found, expired, or revoked',
              },
            },
          },
        }
      )
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
      // WebSocket for real-time collaboration
      .ws('/:setlistId/ws', {
        params: t.Object({
          setlistId: t.String(),
        }),
        query: t.Object({
          userId: t.Optional(t.String()),
          userName: t.Optional(t.String()),
          shareToken: t.Optional(t.String()),
        }),
        open(ws: any) {
          const setlistId = ws.data.params.setlistId as string;
          const userId = (ws.data.query.userId as string) || null;
          const userName = (ws.data.query.userName as string) || 'Guest';
          const shareToken = (ws.data.query.shareToken as string) || null;

          // Generate unique connection ID
          const connectionId = `${setlistId}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

          // Store on ws instance for use in message/close handlers
          (ws as any).setlistId = setlistId;
          (ws as any).connectionId = connectionId;

          // Add user to presence tracking
          const presence = setlistPresenceService.addUser(
            setlistId,
            connectionId,
            userId,
            userName,
            !!userId
          );

          // Subscribe to setlist room
          ws.subscribe(`setlist:${setlistId}`);

          // Send presence update directly to the newly connected client
          ws.send(JSON.stringify({
            type: 'presence-update',
            presence,
            timestamp: new Date().toISOString(),
          }));

          // Also broadcast to all other clients in room
          ws.publish(
            `setlist:${setlistId}`,
            JSON.stringify({
              type: 'presence-update',
              presence,
              timestamp: new Date().toISOString(),
            })
          );
        },

        message(ws: any, message: string | any) {
          const setlistId = ws.setlistId as string;
          const connectionId = ws.connectionId as string;

          try {
            // Handle both string and object message formats
            const parsed = typeof message === 'string' ? JSON.parse(message) : message;

            switch (parsed.type) {
              case 'start-editing': {
                setlistPresenceService.updateEditingStatus(
                  setlistId,
                  connectionId,
                  true
                );
                const updatedPresence =
                  setlistPresenceService.getPresence(setlistId);

                ws.publish(
                  `setlist:${setlistId}`,
                  JSON.stringify({
                    type: 'presence-update',
                    presence: updatedPresence,
                    timestamp: new Date().toISOString(),
                  })
                );
                break;
              }

              case 'stop-editing': {
                setlistPresenceService.updateEditingStatus(
                  setlistId,
                  connectionId,
                  false
                );
                const updatedPresence =
                  setlistPresenceService.getPresence(setlistId);

                ws.publish(
                  `setlist:${setlistId}`,
                  JSON.stringify({
                    type: 'presence-update',
                    presence: updatedPresence,
                    timestamp: new Date().toISOString(),
                  })
                );
                break;
              }

              default:
                console.warn('Unknown message type:', parsed.type);
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        },

        close(ws: any) {
          const setlistId = ws.setlistId as string;
          const connectionId = ws.connectionId as string;

          // Remove user from presence tracking
          const updatedPresence = setlistPresenceService.removeUser(
            setlistId,
            connectionId
          );

          // Broadcast presence update to remaining clients
          if (updatedPresence.length > 0) {
            ws.publish(
              `setlist:${setlistId}`,
              JSON.stringify({
                type: 'presence-update',
                presence: updatedPresence,
                timestamp: new Date().toISOString(),
              })
            );
          }
        },

        detail: {
          tags: ['Setlists'],
          summary: 'WebSocket for Real-Time Collaboration',
          description:
            'WebSocket connection for real-time setlist collaboration. Clients connect with optional userId and userName. Server broadcasts presence updates when users join/leave or change editing status.',
        },
      })
  );
