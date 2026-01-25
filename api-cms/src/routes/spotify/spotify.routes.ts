import { Elysia } from 'elysia';
import { spotifyController, SpotifyError } from './spotify.controller';
import { requireAuth } from '@middleware/jwt.middleware';

export const spotifyRoutes = new Elysia({ prefix: '/spotify' })
  .error({
    SPOTIFY_ERROR: SpotifyError,
  })
  .onError(({ code, error, set }) => {
    if (error instanceof SpotifyError) {
      set.status = error.statusCode;
      return { error: error.message };
    }
  })
  .use(requireAuth)
  .get(
    '/search',
    async ({ query }) => {
      const q = (query as any)?.q;
      const limit = (query as any)?.limit ? parseInt((query as any).limit) : 20;
      return spotifyController.searchTracks(q, limit);
    },
    {
      detail: {
        tags: ['Spotify'],
        summary: 'Search Spotify tracks',
        description: 'Search the Spotify catalog for tracks by query',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .post(
    '/import',
    async ({ body, admin }) => {
      const data = body as any;
      return spotifyController.importTracksFromSpotify(data.trackIds || [], admin.adminUserId);
    },
    {
      detail: {
        tags: ['Spotify'],
        summary: 'Import tracks from Spotify',
        description: 'Bulk import selected tracks from Spotify search results',
        security: [{ bearerAuth: [] }],
      },
    }
  );
