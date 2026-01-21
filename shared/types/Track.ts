export enum TrackType {
  SONG = 'SONG',
  OTHER = 'OTHER',
}

export interface Track {
  trackId: string;
  type: TrackType;
  title: string;
  artist: string;
  defaultDuration: number | null;
  defaultTuning: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

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
