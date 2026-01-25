import { spotifyService } from '@services/spotify.service';
import { importService } from '@services/import.service';

export class SpotifyError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'SpotifyError';
  }
}

export const spotifyController = {
  async searchTracks(query: string, limit?: number) {
    if (!query || typeof query !== 'string') {
      throw new SpotifyError('Search query is required and must be a string', 400);
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new SpotifyError('Spotify credentials are not configured', 500);
    }

    try {
      const accessToken = await spotifyService.getAccessToken(clientId, clientSecret);
      const tracks = await spotifyService.searchTracks(query.trim(), accessToken, limit || 20);
      return spotifyService.transformSpotifyTracks(tracks);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to search Spotify';
      throw new SpotifyError(message, 500);
    }
  },

  async importTracksFromSpotify(trackIds: string[], adminUserId: string) {
    if (!Array.isArray(trackIds) || trackIds.length === 0) {
      throw new SpotifyError('Track IDs array is required and must not be empty', 400);
    }

    if (trackIds.length > 100) {
      throw new SpotifyError('Maximum 100 tracks can be imported at once', 400);
    }

    // Validate all are strings
    if (!trackIds.every((id) => typeof id === 'string')) {
      throw new SpotifyError('All track IDs must be strings', 400);
    }

    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        throw new SpotifyError('Spotify credentials are not configured', 500);
      }

      // Transform the track data to import format
      // Note: In a real implementation, you'd fetch the actual track data using the track IDs
      // For now, this is a placeholder that the client will fill in with full track data
      const accessToken = await spotifyService.getAccessToken(clientId, clientSecret);

      // This is simplified - in production, you'd fetch track details from Spotify using the IDs
      // and validate them before importing
      const importTracks = trackIds.map((id) => ({
        title: `Imported from Spotify: ${id}`,
        artist: 'Unknown',
        type: 'SONG',
        duration: 0,
      }));

      return importService.bulkImportTracks(importTracks, adminUserId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to import from Spotify';
      throw new SpotifyError(message, 500);
    }
  },
};
