import { feedService } from './feed.service';
import type { GetFeedQuery } from '@types';

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

      // If no firebaseUid (unauthenticated), return popular/recent events
      if (!firebaseUid) {
        const { events, total } = await feedService.getPublicEvents(page, limit);
        return { events, total, page, limit };
      }

      // Find authenticated user
      const user = await feedService.findUserWithFollows(firebaseUid);

      if (!user) {
        // User not found, treat as unauthenticated
        const { events, total } = await feedService.getPublicEvents(page, limit);
        return { events, total, page, limit };
      }

      // If authenticated user has no follows, return popular/recent events
      if (user.follows.length === 0) {
        const { events, total } = await feedService.getPublicEvents(page, limit);
        return { events, total, page, limit };
      }

      // Extract followed entity IDs
      const followedVenueIds: string[] = [];
      const followedActIds: string[] = [];

      for (const follow of user.follows) {
        if (follow.guild) {
          if (follow.guild.actId) followedActIds.push(follow.guild.actId);
          if (follow.guild.venueId) followedVenueIds.push(follow.guild.venueId);
        }
      }

      // Query events from followed guilds
      const { events, total } = await feedService.getFollowedEvents(
        followedVenueIds,
        followedActIds,
        page,
        limit
      );

      return { events, total, page, limit };
    } catch (error) {
      console.error('Get feed error:', error);
      throw error;
    }
  }
};
