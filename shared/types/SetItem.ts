// Base SetItem type is exported from Prisma-generated types
// Custom DTOs and extended types below

import type { SetItem } from '../generated/prisma-client/index.js';
import { Track } from './Track';

export type { SetItem };

export interface CreateSetItemInput {
  trackId: string;
  position: number;
  customTuning?: string;
  customNotes?: string;
  customDuration?: number;
  sectionId?: string;
}

export interface UpdateSetItemInput {
  position?: number;
  customTuning?: string | null;
  customNotes?: string | null;
  customDuration?: number | null;
  sectionId?: string | null;
}

export interface SetItemWithTrack extends SetItem {
  track: Track;
}
