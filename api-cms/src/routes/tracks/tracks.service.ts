import { PrismaClient } from '../../config/prisma';
import { TrackType, Track } from '../../generated/prisma-client';

const prisma = PrismaClient;

export interface CreateTrackInput {
  title: string;
  artist: string;
  type?: TrackType;
  defaultDuration?: number;
  defaultTuning?: string;
}

export interface UpdateTrackInput {
  title?: string;
  artist?: string;
  type?: TrackType;
  defaultDuration?: number | null;
  defaultTuning?: string | null;
}

export const tracksService = {
  async create(data: CreateTrackInput, createdBy: string) {
    return prisma.track.create({
      data: {
        ...data,
        createdBy,
        type: data.type || 'SONG',
      },
    });
  },

  async getById(trackId: string) {
    return prisma.track.findUnique({
      where: { trackId },
      include: {
        tags: true,
      },
    });
  },

  async list(filters?: {
    query?: string;
    type?: TrackType;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    const where: any = {};
    if (filters?.type) where.type = filters.type;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.query) {
      where.OR = [
        { title: { contains: filters.query, mode: 'insensitive' } },
        { artist: { contains: filters.query, mode: 'insensitive' } },
      ];
    }

    const [tracks, total] = await Promise.all([
      prisma.track.findMany({
        where,
        include: { tags: true },
        take: limit,
        skip: offset,
        orderBy: [{ title: 'asc' }, { artist: 'asc' }],
      }),
      prisma.track.count({ where }),
    ]);

    return { tracks, total, limit, offset };
  },

  async update(trackId: string, data: UpdateTrackInput) {
    return prisma.track.update({
      where: { trackId },
      data,
      include: { tags: true },
    });
  },

  async softDelete(trackId: string) {
    return prisma.track.update({
      where: { trackId },
      data: { isActive: false },
    });
  },

  async restore(trackId: string) {
    return prisma.track.update({
      where: { trackId },
      data: { isActive: true },
    });
  },

  async addTag(trackId: string, tagId: string) {
    return prisma.track.update({
      where: { trackId },
      data: {
        tags: {
          connect: { tagId },
        },
      },
      include: { tags: true },
    });
  },

  async removeTag(trackId: string, tagId: string) {
    return prisma.track.update({
      where: { trackId },
      data: {
        tags: {
          disconnect: { tagId },
        },
      },
      include: { tags: true },
    });
  },
};
