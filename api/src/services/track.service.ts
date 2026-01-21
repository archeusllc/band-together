import { prisma } from './prisma.service';
import type { TrackSearchResult } from '@band-together/shared';

interface SearchTracksOptions {
  query?: string;
  type?: string | string[];
  limit: number;
  offset: number;
  sortBy: 'title' | 'artist' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export const trackService = {
  searchTracks: async (options: SearchTracksOptions) => {
    const { query, type, limit, offset, sortBy, sortOrder } = options;

    // Build WHERE clause for Track filtering
    const where = {
      isActive: true, // Only return active tracks
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { artist: { contains: query, mode: 'insensitive' as const } }
        ]
      }),
      ...(type && {
        type: Array.isArray(type)
          ? { in: type as any }
          : (type as any)
      })
    };

    // Execute queries in parallel
    const [tracks, total] = await Promise.all([
      prisma.track.findMany({
        where,
        select: {
          trackId: true,
          type: true,
          title: true,
          artist: true,
          defaultDuration: true
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip: offset
      }),
      prisma.track.count({ where })
    ]);

    return {
      data: tracks as TrackSearchResult[],
      total,
      limit,
      offset
    };
  }
};
