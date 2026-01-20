import { api } from './api';
import { firebaseAuthService } from './firebase-auth.service';

export const feedService = {
  /**
   * Get activity feed (works for authenticated and unauthenticated users)
   */
  getFeed: async (page: number = 1, limit: number = 20) => {
    try {
      // Get optional auth token (feed works for both authenticated and unauthenticated)
      const idToken = await firebaseAuthService.getIdToken().catch(() => null);

      const headers = idToken ? {
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      } : {};

      const { data, error } = await api.feed.get({
        ...headers,
        $query: { page, limit }
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get calendar events with filtering (requires auth)
   */
  getEvents: async (
    page: number = 1,
    limit: number = 20,
    filters?: {
      startDate?: string;
      endDate?: string;
      venueId?: string;
      actId?: string;
    }
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.events.get({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        $query: { page, limit, ...filters }
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get user's follows (requires auth)
   */
  getFollows: async () => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.follows.get({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Follow an entity (requires auth)
   */
  createFollow: async (
    entityType: 'USER' | 'TAG' | 'GUILD',
    entityId: { followedUserId?: string; tagId?: string; guildId?: string }
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.follows.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        entityType,
        ...entityId
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Unfollow an entity (requires auth)
   */
  deleteFollow: async (followId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.follows({ followId }).delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get single event by ID (public endpoint)
   */
  getEventById: async (eventId: string) => {
    try {
      // Optional auth - endpoint is public but may return personalized data if authenticated
      const idToken = await firebaseAuthService.getIdToken().catch(() => null);

      const headers = idToken ? {
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      } : {};

      const { data, error } = await api.events({ eventId }).get(headers);

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
