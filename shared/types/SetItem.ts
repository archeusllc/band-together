import { Track } from './Track';

export interface SetItem {
  setItemId: string;
  setListId: string;
  trackId: string;
  position: number;
  customTuning: string | null;
  customNotes: string | null;
  customDuration: number | null;
  sectionId: string | null;
  createdAt: string;
  updatedAt: string;
}

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
