import { tracksService } from './tracks.service';

interface SearchParams {
  query?: string;
  type?: string;
  limit: number;
  offset: number;
  sortBy: string;
  sortOrder: string;
}

export const tracksController = {
  searchTracks: async (params: SearchParams) => {
    const { query, type, limit, offset, sortBy, sortOrder } = params;

    // Validate sortBy
    const validSortFields = ['title', 'artist', 'createdAt'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`Invalid sortBy field. Valid options: ${validSortFields.join(', ')}`);
    }

    // Validate sortOrder
    if (!['asc', 'desc'].includes(sortOrder)) {
      throw new Error('Invalid sortOrder. Valid options: asc, desc');
    }

    // Validate and parse type if provided
    let typeFilter: string | string[] | undefined;
    if (type) {
      const validTypes = ['SONG', 'OTHER'];
      const types = type
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      if (types.length === 0) {
        throw new Error('Type filter cannot be empty');
      }

      if (!types.every(t => validTypes.includes(t))) {
        throw new Error(`Invalid track type. Valid options: ${validTypes.join(', ')}`);
      }

      typeFilter = types.length === 1 ? types[0] : types;
    }

    // Call service
    return tracksService.searchTracks({
      query: query?.trim(),
      type: typeFilter,
      limit,
      offset,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any
    });
  }
};
