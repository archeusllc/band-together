import { prisma } from '@services';
import type { GetEventsQuery } from '@types';

export const eventsService = {
  /**
   * Get calendar events with filtering
   */
  getEvents: async (firebaseUid: string, query: GetEventsQuery) => {
    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const skip = (page - 1) * limit;

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
  },

  /**
   * Get single event by ID with full details
   */
  getEventById: async (eventId: string) => {
    const event = await prisma.calendarEvent.findUnique({
      where: { eventId },
      include: {
        venue: {
          include: {
            guild: true  // Include venue's guild for follow status
          }
        },
        acts: {
          include: {
            guild: true  // Include acts' guilds for follow status
          }
        }
      }
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }
};
