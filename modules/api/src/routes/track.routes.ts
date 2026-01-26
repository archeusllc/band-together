import Elysia, { t } from 'elysia';
import { tracksController } from '@routes/tracks/tracks.controller';

export const trackRoutes = new Elysia().group('/tracks', (track) =>
  track.get(
    '/search',
    async ({ query, set }) => {
      try {
        return await tracksController.searchTracks({
          query: query.query,
          type: query.type,
          limit: query.limit || 20,
          offset: query.offset || 0,
          sortBy: query.sortBy || 'title',
          sortOrder: query.sortOrder || 'asc'
        });
      } catch (error) {
        set.status = 400;
        return { error: (error as Error).message };
      }
    },
    {
      query: t.Object({
        query: t.Optional(t.String()),
        type: t.Optional(t.String()),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
        offset: t.Optional(t.Number({ minimum: 0 })),
        sortBy: t.Optional(t.String()),
        sortOrder: t.Optional(t.String())
      }),
      detail: {
        tags: ['Tracks'],
        summary: 'Search for tracks',
        description: 'Get paginated list of tracks (songs, comedy acts, etc.) matching search criteria. No authentication required.',
        responses: {
          200: {
            description: 'Successful search result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          trackId: { type: 'string' },
                          type: { type: 'string', enum: ['SONG', 'OTHER'] },
                          title: { type: 'string' },
                          artist: { type: 'string' },
                          defaultDuration: { type: 'number', nullable: true }
                        }
                      }
                    },
                    total: { type: 'number' },
                    limit: { type: 'number' },
                    offset: { type: 'number' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid parameters'
          }
        }
      }
    }
  )
);
