import { eventsService } from './events.service';
import type { GetEventsQuery } from '@types';

export const eventsController = {
  /**
   * Get calendar events with filtering
   */
  getEvents: async (firebaseUid: string, query: GetEventsQuery) => {
    try {
      return await eventsService.getEvents(firebaseUid, query);
    } catch (error) {
      console.error('Get events error:', error);
      throw error;
    }
  },

  /**
   * Get single event by ID with full details
   */
  getEventById: async (firebaseUid: string | null, eventId: string) => {
    try {
      return await eventsService.getEventById(eventId);
    } catch (error) {
      console.error('Get event by ID error:', error);
      throw error;
    }
  }
};
