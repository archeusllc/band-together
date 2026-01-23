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

    const updates: { name?: string; description?: string | null; guildId?: string | null } = {};
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

  /**
   * Add a track to a setlist
   */
  addSetItem: async (
    setlistId: string,
    userId: string,
    data: {
      trackId: string;
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      position?: number;
      sectionId?: string;
    }
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!data.trackId || data.trackId.trim().length === 0) {
      throw new Error('Track ID is required');
    }

    return await setlistService.addSetItem(setlistId, userId, data);
  },

  /**
   * Update a SetItem's custom overrides
   */
  updateSetItem: async (
    setItemId: string,
    userId: string,
    data: {
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      sectionId?: string | null;
    }
  ) => {
    if (!setItemId || setItemId.trim().length === 0) {
      throw new Error('SetItem ID is required');
    }

    return await setlistService.updateSetItem(setItemId, userId, data);
  },

  /**
   * Remove a track from a setlist
   */
  removeSetItem: async (
    setItemId: string,
    userId: string
  ) => {
    if (!setItemId || setItemId.trim().length === 0) {
      throw new Error('SetItem ID is required');
    }

    return await setlistService.removeSetItem(setItemId, userId);
  },

  /**
   * Reorder tracks in a setlist
   */
  reorderSetItems: async (
    setlistId: string,
    userId: string,
    itemPositions: Array<{
      setItemId: string;
      position: number;
    }>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!itemPositions || itemPositions.length === 0) {
      throw new Error('Item positions array is required');
    }

    return await setlistService.reorderSetItems(setlistId, userId, itemPositions);
  },

  /**
   * Add a section to a setlist
   */
  addSection: async (
    setlistId: string,
    userId: string,
    data: {
      name: string;
      position?: number;
    }
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Section name is required');
    }

    return await setlistService.addSection(setlistId, userId, {
      name: data.name.trim(),
      position: data.position,
    });
  },

  /**
   * Update a section name
   */
  updateSection: async (
    setlistId: string,
    sectionId: string,
    userId: string,
    data: {
      name?: string;
    }
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!sectionId || sectionId.trim().length === 0) {
      throw new Error('Section ID is required');
    }

    return await setlistService.updateSection(setlistId, sectionId, userId, data);
  },

  /**
   * Delete a section from a setlist
   */
  deleteSection: async (
    setlistId: string,
    sectionId: string,
    userId: string
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!sectionId || sectionId.trim().length === 0) {
      throw new Error('Section ID is required');
    }

    return await setlistService.deleteSection(setlistId, sectionId, userId);
  },

  /**
   * Create a share link for a setlist
   */
  createShare: async (
    setlistId: string,
    userId: string,
    data: {
      permission: 'VIEW_ONLY' | 'CAN_EDIT';
      expiresAt?: Date;
    }
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!data.permission) {
      throw new Error('Permission is required');
    }

    return await setlistService.createShare(setlistId, userId, data.permission, data.expiresAt);
  },

  /**
   * List all shares for a setlist
   */
  listShares: async (setlistId: string, userId: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    return await setlistService.listShares(setlistId, userId);
  },

  /**
   * Revoke a share link
   */
  revokeShare: async (setlistId: string, shareId: string, userId: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!shareId || shareId.trim().length === 0) {
      throw new Error('Share ID is required');
    }

    return await setlistService.revokeShare(setlistId, shareId, userId);
  },
};