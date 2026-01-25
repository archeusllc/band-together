export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface TrackForImport {
  title: string;
  artist: string;
  type: string;
  duration: number;
}

export const spotifyService = {
  async getAccessToken(clientId: string, clientSecret: string): Promise<string> {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  },

  async searchTracks(query: string, accessToken: string, limit: number = 20): Promise<SpotifyTrack[]> {
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required');
    }

    if (limit < 1 || limit > 50) {
      throw new Error('Limit must be between 1 and 50');
    }

    const params = new URLSearchParams({
      q: query,
      type: 'track',
      limit: limit.toString(),
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    const data = (await response.json()) as SpotifySearchResponse;
    return data.tracks.items || [];
  },

  transformSpotifyTrack(spotifyTrack: SpotifyTrack): TrackForImport {
    const artistName = spotifyTrack.artists?.[0]?.name || 'Unknown Artist';
    const durationSeconds = Math.round(spotifyTrack.duration_ms / 1000);

    return {
      title: spotifyTrack.name,
      artist: artistName,
      type: 'SONG',
      duration: durationSeconds,
    };
  },

  transformSpotifyTracks(spotifyTracks: SpotifyTrack[]): TrackForImport[] {
    return spotifyTracks.map((track) => this.transformSpotifyTrack(track));
  },
};
