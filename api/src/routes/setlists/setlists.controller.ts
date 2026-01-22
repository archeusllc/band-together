import { setlistService } from './setlists.service';

export const setlistController = {
  /**
   * Create a new setlist for the authenticated user
   */
  createSetlist: async (
    userId: string,
    data: {
      name: string;
      description?: string;
      guildId?: string;
    }
  ) => {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Setlist name is required');
    }

    return await setlistService.createSetlist(
      userId,
      data.name.trim(),
      data.description?.trim(),
      data.guildId
    );
  },

  /**
   * Get all setlists for the authenticated user
   */
  getUserSetlists: async (userId: string) => {
    return await setlistService.getUserSetlists(userId);
  },

  /**
   * Get a setlist by ID with permission checks
   */
  getSetlistById: async (
    setlistId: string,
    userId?: string,
    shareToken?: string
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    const setlist = await setlistService.getSetlistById(
      setlistId,
      userId,
      shareToken
    );

    if (!setlist) {
      throw new Error('Setlist not found or access denied');
    }

    return setlist;
  },

  /**
   * Update a setlist (owner only)
   */
  updateSetlist: async (
    setlistId: string,
    userId: string,
    data: {
      name?: string;
      description?: string;
      guildId?: string | null;
    }
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    const updates: typeof data = {};
    if (data.name !== undefined) {
      const trimmed = data.name.trim();
      if (trimmed.length === 0) {
        throw new Error('Setlist name cannot be empty');
      }
      updates.name = trimmed;
    }
    if (data.description !== undefined) {
      updates.description = data.description?.trim() || null;
    }
    if (data.guildId !== undefined) {
      updates.guildId = data.guildId;
    }

    return await setlistService.updateSetlist(setlistId, userId, updates);
  },

  /**
   * Delete a setlist (owner only)
   */
  deleteSetlist: async (setlistId: string, userId: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    await setlistService.deleteSetlist(setlistId, userId);
    return { success: true };
  },

  /**
   * Duplicate a setlist
   */
  duplicateSetlist: async (setlistId: string, userId: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    return await setlistService.duplicateSetlist(setlistId, userId);
  },
};