import { api } from './api';

export const trackService = {
  /**
   * Search for tracks (songs, comedy acts, etc.)
   * Works for both authenticated and unauthenticated users
   */
  searchTracks: async (
    query?: string,
    type?: 'SONG' | 'OTHER',
    limit: number = 20,
    offset: number = 0,
    sortBy: string = 'title',
    sortOrder: 'asc' | 'desc' = 'asc'
  ) => {
    try {
      const { data, error } = await api.tracks.search.get({
        $query: {
          query,
          type,
          limit,
          offset,
          sortBy,
          sortOrder,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
