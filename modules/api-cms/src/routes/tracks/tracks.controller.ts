import { tracksService, CreateTrackInput, UpdateTrackInput } from './tracks.service';

export class TrackError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'TrackError';
  }
}

export const tracksController = {
  async createTrack(data: CreateTrackInput, adminUserId: string) {
    if (!data.title || !data.artist) {
      throw new TrackError(422, 'Title and artist are required');
    }

    return tracksService.create(data, adminUserId);
  },

  async getTrack(trackId: string) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return track;
  },

  async listTracks(filters?: {
    query?: string;
    type?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    return tracksService.list({
      ...filters,
      type: filters?.type as any,
    });
  },

  async updateTrack(trackId: string, data: UpdateTrackInput) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return tracksService.update(trackId, data);
  },

  async deleteTrack(trackId: string) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return tracksService.softDelete(trackId);
  },

  async restoreTrack(trackId: string) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return tracksService.restore(trackId);
  },

  async addTagToTrack(trackId: string, tagId: string) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return tracksService.addTag(trackId, tagId);
  },

  async removeTagFromTrack(trackId: string, tagId: string) {
    const track = await tracksService.getById(trackId);

    if (!track) {
      throw new TrackError(404, 'Track not found');
    }

    return tracksService.removeTag(trackId, tagId);
  },
};
