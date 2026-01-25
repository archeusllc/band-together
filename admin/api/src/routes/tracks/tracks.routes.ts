import { Elysia } from 'elysia';
import { tracksController, TrackError } from './tracks.controller';
import { requireAuth } from '@middleware/jwt.middleware';

export const tracksRoutes = new Elysia({ prefix: '/tracks' })
  .error({
    TRACK_ERROR: TrackError,
  })
  .onError(({ error, set }) => {
    if (error instanceof TrackError) {
      set.status = error.statusCode;
      return { error: error.message };
    }
  })
  .use(requireAuth)
  .get(
    '/',
    async ({ query }) => {
      const filters: any = {
        query: (query as any)?.q,
        type: (query as any)?.type,
        limit: parseInt((query as any)?.limit) || 20,
        offset: parseInt((query as any)?.offset) || 0,
      };

      // Only set isActive filter if explicitly provided
      if ((query as any)?.active !== undefined) {
        filters.isActive = (query as any)?.active === 'true';
      }

      return tracksController.listTracks(filters);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'List all tracks',
        description: 'Get paginated list of tracks with optional filters',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .post(
    '/',
    async ({ body, admin }) => {
      return tracksController.createTrack(body as any, admin.adminUserId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Create new track',
        description: 'Create a new track in the database',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .get(
    '/:trackId',
    async ({ params }) => {
      return tracksController.getTrack(params.trackId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Get track by ID',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .patch(
    '/:trackId',
    async ({ params, body }) => {
      return tracksController.updateTrack(params.trackId, body as any);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Update track',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    '/:trackId',
    async ({ params }) => {
      return tracksController.deleteTrack(params.trackId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Delete track (soft delete)',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .patch(
    '/:trackId/restore',
    async ({ params }) => {
      return tracksController.restoreTrack(params.trackId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Restore deleted track',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .post(
    '/:trackId/tags/:tagId',
    async ({ params }) => {
      return tracksController.addTagToTrack(params.trackId, params.tagId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Add tag to track',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    '/:trackId/tags/:tagId',
    async ({ params }) => {
      return tracksController.removeTagFromTrack(params.trackId, params.tagId);
    },
    {
      detail: {
        tags: ['Tracks'],
        summary: 'Remove tag from track',
        security: [{ bearerAuth: [] }],
      },
    }
  );
