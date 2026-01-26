import { api } from './api';
import { firebaseAuthService } from './firebase-auth.service';

// Input types for creates/updates
export interface CreateActInput {
  name: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateActInput {
  name?: string;
  bio?: string;
  avatar?: string;
}

export interface CreateVenueInput {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
}

export interface UpdateVenueInput {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
}

export interface CreateClubInput {
  name: string;
  description?: string;
  avatar?: string;
}

export interface UpdateClubInput {
  name?: string;
  description?: string;
  avatar?: string;
}

export const guildService = {
  // ========== ACTS ==========
  /**
   * Get paginated list of acts (public)
   */
  getActs: async (page: number = 1, limit: number = 20, search?: string) => {
    try {
      const { data, error } = await api.acts.get({
        $query: { page, limit, ...(search && { search }) }
      });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get single act by ID (public)
   */
  getActById: async (actId: string) => {
    try {
      const { data, error } = await api.acts[actId].get();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Create new act (requires auth)
   */
  createAct: async (input: CreateActInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.acts.post({
        ...input,
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
   * Update act (requires auth, owner only)
   */
  updateAct: async (actId: string, input: UpdateActInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.acts[actId].patch({
        ...input,
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
   * Delete act (requires auth, owner only)
   */
  deleteAct: async (actId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.acts[actId].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  // ========== VENUES ==========
  /**
   * Get paginated list of venues (public)
   */
  getVenues: async (page: number = 1, limit: number = 20, search?: string) => {
    try {
      const { data, error } = await api.venues.get({
        $query: { page, limit, ...(search && { search }) }
      });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get single venue by ID (public)
   */
  getVenueById: async (venueId: string) => {
    try {
      const { data, error } = await api.venues[venueId].get();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Create new venue (requires auth)
   */
  createVenue: async (input: CreateVenueInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.venues.post({
        ...input,
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
   * Update venue (requires auth, owner only)
   */
  updateVenue: async (venueId: string, input: UpdateVenueInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.venues[venueId].patch({
        ...input,
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
   * Delete venue (requires auth, owner only)
   */
  deleteVenue: async (venueId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.venues[venueId].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  // ========== CLUBS ==========
  /**
   * Get paginated list of clubs (public)
   */
  getClubs: async (page: number = 1, limit: number = 20, search?: string) => {
    try {
      const { data, error } = await api.clubs.get({
        $query: { page, limit, ...(search && { search }) }
      });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get single club by ID (public)
   */
  getClubById: async (clubId: string) => {
    try {
      const { data, error } = await api.clubs[clubId].get();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Create new club (requires auth)
   */
  createClub: async (input: CreateClubInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.clubs.post({
        ...input,
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
   * Update club (requires auth, owner only)
   */
  updateClub: async (clubId: string, input: UpdateClubInput) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.clubs[clubId].patch({
        ...input,
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
   * Delete club (requires auth, owner only)
   */
  deleteClub: async (clubId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.clubs[clubId].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
