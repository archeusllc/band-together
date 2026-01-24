import { api } from './api';
import { firebaseAuthService } from './firebase-auth.service';
import type { SetList, SetItem, SetSection, SetListShare, Track } from '@band-together/shared';

type SetListWithRelations = SetList & {
  setItems: (SetItem & { track: Track; section: SetSection | null })[];
  setSections: SetSection[];
  shares: SetListShare[];
};

export const setlistService = {
  /**
   * Get all setlists for authenticated user
   * Returns personal, guild, and shared setlists
   */
  getUserSetlists: async () => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.setlist.get({
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
   * Get a setlist by ID (requires authentication or shareToken)
   */
  getSetlistById: async (setlistId: string, shareToken?: string) => {
    try {
      let idToken = await firebaseAuthService.getIdToken().catch(() => null);

      // Retry logic: if no token but Firebase user exists, wait for session restoration
      // This handles cases where user is logged in but token not immediately available
      // (e.g., switching between localhost and IP addresses)
      if (!idToken) {
        const fbUser = firebaseAuthService.getCurrentUser();
        if (fbUser) {
          // Wait for Firebase session restoration
          await new Promise(resolve => setTimeout(resolve, 200));
          idToken = await firebaseAuthService.getIdToken().catch(() => null);
        }
      }

      const headers = idToken
        ? {
            $headers: {
              authorization: `Bearer ${idToken}`,
            },
          }
        : {};

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId].get({
        ...headers,
        ...query,
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get a setlist by share token (public access)
   */
  getSetlistByShareToken: async (shareToken: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken().catch(() => null);

      const headers = idToken
        ? {
            $headers: {
              authorization: `Bearer ${idToken}`,
            },
          }
        : {};

      const { data, error } = await api.setlist['by-token'][shareToken].get({
        ...headers,
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Create a new setlist
   */
  createSetlist: async (data: {
    name: string;
    description?: string;
    guildId?: string;
  }) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data: result, error } = await api.setlist.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        name: data.name,
        description: data.description,
        guildId: data.guildId,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Update a setlist (owner only)
   */
  updateSetlist: async (
    setlistId: string,
    data: {
      name?: string;
      description?: string;
      guildId?: string | null;
    }
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data: result, error } = await api.setlist[setlistId].patch({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        name: data.name,
        description: data.description,
        guildId: data.guildId,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Delete a setlist (owner only)
   */
  deleteSetlist: async (setlistId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.setlist[setlistId].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      })

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Duplicate a setlist
   */
  duplicateSetlist: async (setlistId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.setlist[setlistId].duplicate.post({
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
   * Add a track to a setlist
   */
  addSetItem: async (
    setlistId: string,
    data: {
      trackId: string;
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      position?: number;
      sectionId?: string;
    },
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data: result, error } = await api.setlist[setlistId].items.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        trackId: data.trackId,
        customTuning: data.customTuning,
        customNotes: data.customNotes,
        customDuration: data.customDuration,
        position: data.position,
        sectionId: data.sectionId,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Update a SetItem's custom overrides
   */
  updateSetItem: async (
    setlistId: string,
    setItemId: string,
    data: {
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      sectionId?: string | null;
    },
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data: result, error } = await api.setlist[setlistId].items[
        setItemId
      ].patch({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        customTuning: data.customTuning,
        customNotes: data.customNotes,
        customDuration: data.customDuration,
        sectionId: data.sectionId,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Remove a track from a setlist
   */
  deleteSetItem: async (setlistId: string, setItemId: string, shareToken?: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId].items[
        setItemId
      ].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
      })

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Reorder tracks in a setlist
   */
  reorderSetItems: async (
    setlistId: string,
    itemPositions: Array<{
      setItemId: string;
      position: number;
    }>,
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId].reorder.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        itemPositions,
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Reorder items and sections together (unified position space)
   * This allows atomically swapping items and sections in a single transaction
   */
  reorderElements: async (
    setlistId: string,
    itemPositions?: Array<{
      setItemId: string;
      position: number;
    }>,
    sectionPositions?: Array<{
      sectionId: string;
      position: number;
    }>,
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId].reorder.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        itemPositions: itemPositions || [],
        sectionPositions: sectionPositions || [],
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Reorder sections in a setlist
   */
  reorderSections: async (
    setlistId: string,
    sectionPositions: Array<{
      sectionId: string;
      position: number;
    }>,
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId]['sections/reorder'].post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        sectionPositions,
      });

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Add a section to a setlist
   */
  addSection: async (
    setlistId: string,
    data: {
      name: string;
      position?: number;
    },
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data: result, error } = await api.setlist[setlistId].sections.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
        name: data.name,
        position: data.position,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Update a section name
   */
  updateSection: async (
    setlistId: string,
    sectionId: string,
    data: {
      name?: string;
      breakDuration?: number | null;
    },
    shareToken?: string
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const patchData: any = { ...query };
      if (data.name !== undefined) {
        patchData.name = data.name;
      }
      if (data.breakDuration !== undefined) {
        patchData.breakDuration = data.breakDuration;
      }

      const { data: result, error } = await api.setlist[setlistId].sections[
        sectionId
      ].patch({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...patchData,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Delete a section from a setlist
   */
  deleteSection: async (setlistId: string, sectionId: string, shareToken?: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const query = shareToken ? { $query: { shareToken } } : {};

      const { data, error } = await api.setlist[setlistId].sections[
        sectionId
      ].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        ...query,
      })

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Create a share link for a setlist
   */
  createShare: async (
    setlistId: string,
    data: {
      permission: 'VIEW_ONLY' | 'CAN_EDIT';
      expiresAt?: string;
    }
  ) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data: result, error } = await api.setlist[setlistId].shares.post({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
        permission: data.permission,
        expiresAt: data.expiresAt,
      });

      return { data: result, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * List all shares for a setlist (owner only)
   */
  listShares: async (setlistId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.setlist[setlistId].shares.get({
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
   * Revoke a share link
   */
  revokeShare: async (setlistId: string, shareId: string) => {
    try {
      const idToken = await firebaseAuthService.getIdToken();
      if (!idToken) {
        return { data: null, error: 'Authentication required' };
      }

      const { data, error } = await api.setlist[setlistId].shares[
        shareId
      ].delete({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      })

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
