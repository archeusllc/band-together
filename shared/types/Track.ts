// Base Track type and TrackType enum are exported from Prisma-generated types
// Custom DTOs and extended types below

import type { TrackType } from '../generated/prisma-client/index.js';
export type { Track, TrackType } from '../generated/prisma-client/index.js';

export interface CreateTrackInput {
  type: TrackType;
  title: string;
  artist: string;
  defaultDuration?: number;
  defaultTuning?: string;
  createdBy: string;
  genreTagIds?: string[];
}

export interface UpdateTrackInput {
  type?: TrackType;
  title?: string;
  artist?: string;
  defaultDuration?: number | null;
  defaultTuning?: string | null;
  isActive?: boolean;
  genreTagIds?: string[];
}

export interface TrackSearchResult {
  trackId: string;
  type: TrackType;
  title: string;
  artist: string;
  defaultDuration: number | null;
}
