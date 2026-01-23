import { setlistService } from './setlists.service';
import type { Elysia } from 'elysia';

export const setlistController = {
  /**
   * Create a new setlist for the authenticated user
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  createSetlist: async (
    firebaseUid: string,
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
      firebaseUid,
      data.name.trim(),
      data.description?.trim(),
      data.guildId
    );
  },

  /**
   * Get all setlists for the authenticated user
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  getUserSetlists: async (firebaseUid: string) => {
    return await setlistService.getUserSetlists(firebaseUid);
  },

  /**
   * Get a setlist by ID with permission checks
   * @param firebaseUid - Firebase UID of the authenticated user (optional)
   */
  getSetlistById: async (
    setlistId: string,
    firebaseUid?: string,
    shareToken?: string
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    const setlist = await setlistService.getSetlistById(
      setlistId,
      firebaseUid,
      shareToken
    );

    if (!setlist) {
      throw new Error('Setlist not found or access denied');
    }

    return setlist;
  },

  /**
   * Update a setlist (owner only)
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  updateSetlist: async (
    setlistId: string,
    firebaseUid: string,
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

    return await setlistService.updateSetlist(setlistId, firebaseUid, updates);
  },

  /**
   * Delete a setlist (owner only)
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  deleteSetlist: async (setlistId: string, firebaseUid: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    await setlistService.deleteSetlist(setlistId, firebaseUid);
    return { success: true };
  },

  /**
   * Duplicate a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  duplicateSetlist: async (setlistId: string, firebaseUid: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    return await setlistService.duplicateSetlist(setlistId, firebaseUid);
  },

  /**
   * Add a track to a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  addSetItem: async (
    setlistId: string,
    firebaseUid: string,
    data: {
      trackId: string;
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      position?: number;
      sectionId?: string;
    },
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!data.trackId || data.trackId.trim().length === 0) {
      throw new Error('Track ID is required');
    }

    return await setlistService.addSetItem(setlistId, firebaseUid, data, app);
  },

  /**
   * Update a SetItem's custom overrides
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  updateSetItem: async (
    setItemId: string,
    firebaseUid: string,
    data: {
      customTuning?: string;
      customNotes?: string;
      customDuration?: number;
      sectionId?: string | null;
    },
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setItemId || setItemId.trim().length === 0) {
      throw new Error('SetItem ID is required');
    }

    return await setlistService.updateSetItem(setItemId, firebaseUid, data, app);
  },

  /**
   * Remove a track from a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  removeSetItem: async (
    setItemId: string,
    firebaseUid: string,
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setItemId || setItemId.trim().length === 0) {
      throw new Error('SetItem ID is required');
    }

    return await setlistService.removeSetItem(setItemId, firebaseUid, app);
  },

  /**
   * Reorder tracks in a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  reorderSetItems: async (
    setlistId: string,
    firebaseUid: string,
    itemPositions: Array<{
      setItemId: string;
      position: number;
    }>,
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!itemPositions || itemPositions.length === 0) {
      throw new Error('Item positions array is required');
    }

    return await setlistService.reorderSetItems(setlistId, firebaseUid, itemPositions, app);
  },

  /**
   * Add a section to a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  addSection: async (
    setlistId: string,
    firebaseUid: string,
    data: {
      name: string;
      position?: number;
    },
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Section name is required');
    }

    return await setlistService.addSection(setlistId, firebaseUid, {
      name: data.name.trim(),
      position: data.position,
    }, app);
  },

  /**
   * Update a section name
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  updateSection: async (
    setlistId: string,
    sectionId: string,
    firebaseUid: string,
    data: {
      name?: string;
    },
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!sectionId || sectionId.trim().length === 0) {
      throw new Error('Section ID is required');
    }

    return await setlistService.updateSection(setlistId, sectionId, firebaseUid, data, app);
  },

  /**
   * Delete a section from a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  deleteSection: async (
    setlistId: string,
    sectionId: string,
    firebaseUid: string,
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!sectionId || sectionId.trim().length === 0) {
      throw new Error('Section ID is required');
    }

    return await setlistService.deleteSection(setlistId, sectionId, firebaseUid, app);
  },

  /**
   * Create a share link for a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  createShare: async (
    setlistId: string,
    firebaseUid: string,
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

    return await setlistService.createShare(setlistId, firebaseUid, data.permission, data.expiresAt);
  },

  /**
   * List all shares for a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  listShares: async (setlistId: string, firebaseUid: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }

    return await setlistService.listShares(setlistId, firebaseUid);
  },

  /**
   * Revoke a share link
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  revokeShare: async (setlistId: string, shareId: string, firebaseUid: string) => {
    if (!setlistId || setlistId.trim().length === 0) {
      throw new Error('Setlist ID is required');
    }
    if (!shareId || shareId.trim().length === 0) {
      throw new Error('Share ID is required');
    }

    return await setlistService.revokeShare(setlistId, shareId, firebaseUid);
  },
};