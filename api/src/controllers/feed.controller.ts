import { prisma } from '@services';
import type { GetFeedQuery, GetEventsQuery, CreateFollowBody } from '@types';

export const feedController = {
  /**
   * Get personalized feed for user
   * Returns calendar events from followed entities, sorted by startTime
   * Works for both authenticated and unauthenticated users
   */
  getFeed: async (firebaseUid: string | null, query: GetFeedQuery) => {
    try {
      const page = query.page || 1;
      const limit = Math.min(query.limit || 20, 100); // Max 100
      const skip = (page - 1) * limit;

      // If no firebaseUid (unauthenticated), return popular/recent events
      if (!firebaseUid) {
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

        return { events, total, page, limit };
      }

      // Find authenticated user
      const user = await prisma.user.findUnique({
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

      if (!user) {
        // User not found, treat as unauthenticated
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

        return { events, total, page, limit };
      }

      // If authenticated user has no follows, return popular/recent events
      if (user.follows.length === 0) {
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

        return { events, total, page, limit };
      }

      // Extract followed entity IDs
      const followedGuildIds = user.follows
        .filter(f => f.entityType === 'GUILD' && f.guildId)
        .map(f => f.guildId!);

      const followedTagIds = user.follows
        .filter(f => f.entityType === 'TAG' && f.tagId)
        .map(f => f.tagId!);

      // Get events from followed guilds (via acts/venues)
      const followedActIds: string[] = [];
      const followedVenueIds: string[] = [];

      for (const follow of user.follows) {
        if (follow.guild) {
          if (follow.guild.actId) followedActIds.push(follow.guild.actId);
          if (follow.guild.venueId) followedVenueIds.push(follow.guild.venueId);
        }
      }

      // Query events
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

      return { events, total, page, limit };
    } catch (error) {
      console.error('Get feed error:', error);
      throw error;
    }
  },

  /**
   * Get calendar events with filtering
   */
  getEvents: async (firebaseUid: string, query: GetEventsQuery) => {
    try {
      const page = query.page || 1;
      const limit = Math.min(query.limit || 20, 100);
      const skip = (page - 1) * limit;

      // Verify user exists
      const user = await prisma.user.findUnique({
        where: { firebaseUid }
      });
      if (!user) throw new Error('User not found');

      // Build filter
      const where: any = {
        startTime: { gte: new Date() }
      };

      if (query.startDate) {
        where.startTime = { gte: new Date(query.startDate) };
      }

      if (query.endDate) {
        where.startTime = {
          ...where.startTime,
          lte: new Date(query.endDate)
        };
      }

      if (query.venueId) {
        where.venueId = query.venueId;
      }

      if (query.actId) {
        where.acts = { some: { actId: query.actId } };
      }

      const events = await prisma.calendarEvent.findMany({
        where,
        include: {
          venue: true,
          acts: true
        },
        orderBy: { startTime: 'asc' },
        skip,
        take: limit
      });

      const total = await prisma.calendarEvent.count({ where });

      return { events, total, page, limit };
    } catch (error) {
      console.error('Get events error:', error);
      throw error;
    }
  },

  /**
   * Get user's follows
   */
  getFollows: async (firebaseUid: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid }
      });

      if (!user) throw new Error('User not found');

      const follows = await prisma.follow.findMany({
        where: { userId: user.userId },
        include: {
          followedUser: true,
          tag: true,
          guild: {
            include: {
              act: true,
              venue: true,
              club: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return { follows, total: follows.length };
    } catch (error) {
      console.error('Get follows error:', error);
      throw error;
    }
  },

  /**
   * Follow an entity (User, Tag, or Guild)
   */
  createFollow: async (firebaseUid: string, data: CreateFollowBody) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid }
      });

      if (!user) throw new Error('User not found');

      // Validate entity type and corresponding ID
      if (data.entityType === 'USER' && !data.followedUserId) {
        throw new Error('followedUserId required for USER entity type');
      }
      if (data.entityType === 'TAG' && !data.tagId) {
        throw new Error('tagId required for TAG entity type');
      }
      if (data.entityType === 'GUILD' && !data.guildId) {
        throw new Error('guildId required for GUILD entity type');
      }

      // Check if follow already exists
      const existing = await prisma.follow.findFirst({
        where: {
          userId: user.userId,
          entityType: data.entityType,
          followedUserId: data.followedUserId || null,
          tagId: data.tagId || null,
          guildId: data.guildId || null
        }
      });

      if (existing) {
        throw new Error('Already following this entity');
      }

      // Create follow
      const follow = await prisma.follow.create({
        data: {
          userId: user.userId,
          entityType: data.entityType,
          followedUserId: data.followedUserId || null,
          tagId: data.tagId || null,
          guildId: data.guildId || null
        },
        include: {
          followedUser: true,
          tag: true,
          guild: {
            include: {
              act: true,
              venue: true,
              club: true
            }
          }
        }
      });

      return follow;
    } catch (error) {
      console.error('Create follow error:', error);
      throw error;
    }
  },

  /**
   * Unfollow an entity
   */
  deleteFollow: async (firebaseUid: string, followId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid }
      });

      if (!user) throw new Error('User not found');

      // Verify follow belongs to user
      const follow = await prisma.follow.findUnique({
        where: { followId }
      });

      if (!follow) {
        throw new Error('Follow not found');
      }

      if (follow.userId !== user.userId) {
        throw new Error('Unauthorized to delete this follow');
      }

      await prisma.follow.delete({
        where: { followId }
      });

      return { success: true };
    } catch (error) {
      console.error('Delete follow error:', error);
      throw error;
    }
  }
};
