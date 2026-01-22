import { prisma } from '@services';
import type { GetFeedQuery } from '@types';

export const feedService = {
  /**
   * Get all upcoming calendar events (for unauthenticated users)
   */
  getPublicEvents: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const events = await prisma.calendarEvent.findMany({
      where: {
        startTime: { gte: new Date() }
      },
      include: {
        venue: true,
        acts: true
      },
      orderBy: { startTime: 'asc' },
      skip,
      take: limit
    });

    const total = await prisma.calendarEvent.count({
      where: { startTime: { gte: new Date() } }
    });

    return { events, total };
  },

  /**
   * Find user by Firebase UID with follows included
   */
  findUserWithFollows: async (firebaseUid: string) => {
    return await prisma.user.findUnique({
      where: { firebaseUid },
      include: {
        follows: {
          include: {
            guild: {
              include: {
                act: true,
                venue: true,
                club: true
              }
            },
            tag: true
          }
        }
      }
    });
  },

  /**
   * Get events from followed guilds for authenticated user
   */
  getFollowedEvents: async (
    followedVenueIds: string[],
    followedActIds: string[],
    page: number,
    limit: number
  ) => {
    const skip = (page - 1) * limit;

    const events = await prisma.calendarEvent.findMany({
      where: {
        AND: [
          { startTime: { gte: new Date() } },
          {
            OR: [
              { venueId: { in: followedVenueIds } },
              { acts: { some: { actId: { in: followedActIds } } } }
              // TODO: Add tag filtering when tags are linked to events
            ]
          }
        ]
      },
      include: {
        venue: true,
        acts: true
      },
      orderBy: { startTime: 'asc' },
      skip,
      take: limit
    });

    const total = await prisma.calendarEvent.count({
      where: {
        AND: [
          { startTime: { gte: new Date() } },
          {
            OR: [
              { venueId: { in: followedVenueIds } },
              { acts: { some: { actId: { in: followedActIds } } } }
            ]
          }
        ]
      }
    });

    return { events, total };
  }
};
