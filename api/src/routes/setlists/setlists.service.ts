import { prisma } from '@services/prisma.service';
import { broadcastService } from '@services/broadcast.service';
import type { Elysia } from 'elysia';

/**
 * Helper function to get database userId from Firebase UID
 * The middleware creates users in the database with a cuid userId,
 * but passes firebase.uid to the handlers. This helper looks up the actual database userId.
 */
const getUserIdByFirebaseUid = async (firebaseUid: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { firebaseUid },
    select: { userId: true },
  });

  if (!user) {
    throw new Error('User not found in database');
  }

  return user.userId;
};

/**
 * Helper function to get user details (userId and displayName) from Firebase UID
 */
const getUserDetailsFromFirebaseUid = async (
  firebaseUid: string
): Promise<{ userId: string; displayName: string }> => {
  const user = await prisma.user.findUnique({
    where: { firebaseUid },
    select: { userId: true, displayName: true },
  });

  if (!user) {
    throw new Error('User not found in database');
  }

  return {
    userId: user.userId,
    displayName: user.displayName || 'User',
  };
};

export const setlistService = {
  /**
   * Create a new setlist for the authenticated user
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  createSetlist: async (
    firebaseUid: string,
    name: string,
    description?: string,
    guildId?: string
  ) => {
    // Look up the user by Firebase UID to get their database userId
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    return await prisma.setList.create({
      data: {
        name,
        description,
        ownerId: userId, // Use database userId, not Firebase UID
        guildId,
        isPrivate: true, // Always private by design
      },
      include: {
        setItems: {
          include: {
            track: true,
            section: true,
          },
        },
        setSections: true,
        shares: true,
      },
    });
  },

  /**
   * Get all setlists for a user (personal, guild-associated, and shared)
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  getUserSetlists: async (firebaseUid: string) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    const [personal, shared] = await Promise.all([
      // Personal setlists + guild-associated setlists
      prisma.setList.findMany({
        where: {
          OR: [
            { ownerId: userId },
            {
              // Setlists from guilds the user belongs to
              guild: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
          ],
        },
        include: {
          setItems: {
            include: { track: true },
          },
          shares: true,
          guild: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      // Setlists shared with this user via tokens (public share links)
      prisma.setList.findMany({
        where: {
          shares: {
            some: {
              AND: [
                {
                  OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                  ],
                },
              ],
            },
          },
        },
        include: {
          setItems: {
            include: { track: true },
          },
          shares: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { personal, shared };
  },

  /**
   * Get a setlist by ID with permission checks
   * @param setlistId - ID of the setlist to retrieve
   * @param firebaseUid - Firebase UID of the authenticated user (optional)
   * @param shareToken - Share token for accessing shared setlists (optional)
   */
  getSetlistById: async (
    setlistId: string,
    firebaseUid?: string,
    shareToken?: string
  ) => {
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
      include: {
        setItems: {
          include: {
            track: true,
            section: true,
          },
          orderBy: { position: 'asc' },
        },
        setSections: {
          orderBy: { position: 'asc' },
        },
        shares: true,
        guild: true,
        owner: {
          select: {
            userId: true,
            email: true,
          },
        },
      },
    });

    if (!setlist) return null;

    // Look up database userId from Firebase UID if authenticated
    let databaseUserId: string | undefined;
    if (firebaseUid) {
      try {
        databaseUserId = await getUserIdByFirebaseUid(firebaseUid);
      } catch {
        // User not found in database - continue without authentication
        databaseUserId = undefined;
      }
    }

    // Check permissions
    const isOwner = databaseUserId && setlist.ownerId === databaseUserId;
    const isGuildMember =
      databaseUserId &&
      setlist.guildId &&
      (await prisma.guild.findFirst({
        where: {
          guildId: setlist.guildId,
          members: {
            some: {
              userId: databaseUserId,
            },
          },
        },
      }));

    const validShare =
      shareToken &&
      (await prisma.setListShare.findFirst({
        where: {
          setListId: setlistId,
          shareToken,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      }));

    const hasAccess = isOwner || isGuildMember || validShare;

    if (!hasAccess && setlist.isPrivate) {
      return null; // Deny access to private setlists without permission
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
    updates: {
      name?: string;
      description?: string | null;
      guildId?: string | null;
    }
  ) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    // Check ownership
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist || setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can update it');
    }

    return await prisma.setList.update({
      where: { setListId: setlistId },
      data: updates,
      include: {
        setItems: {
          include: {
            track: true,
            section: true,
          },
        },
        setSections: true,
        shares: true,
      },
    });
  },

  /**
   * Delete a setlist (owner only, cascade deletes items and sections)
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  deleteSetlist: async (setlistId: string, firebaseUid: string) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    // Check ownership
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist || setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can delete it');
    }

    // Delete in order: shares, items, sections, then setlist
    await prisma.setListShare.deleteMany({
      where: { setListId: setlistId },
    });

    await prisma.setItem.deleteMany({
      where: { setListId: setlistId },
    });

    await prisma.setSection.deleteMany({
      where: { setListId: setlistId },
    });

    await prisma.setList.delete({
      where: { setListId: setlistId },
    });

    return true;
  },

  /**
   * Duplicate a setlist with all its items and sections
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  duplicateSetlist: async (setlistId: string, firebaseUid: string) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    const original = await prisma.setList.findUnique({
      where: { setListId: setlistId },
      include: {
        setItems: {
          include: { section: true },
        },
        setSections: true,
      },
    });

    if (!original) {
      throw new Error('Setlist not found');
    }

    // Check access (owner or guild member)
    const isOwner = original.ownerId === userId;
    const isGuildMember =
      original.guildId &&
      (await prisma.guild.findFirst({
        where: {
          guildId: original.guildId,
          members: {
            some: {
              userId,
            },
          },
        },
      }));

    if (!isOwner && !isGuildMember) {
      throw new Error('Unauthorized: insufficient permissions to duplicate');
    }

    // Create new setlist with duplicated content
    const newSetlist = await prisma.setList.create({
      data: {
        name: `${original.name} (Copy)`,
        description: original.description,
        ownerId: userId, // The duplicator becomes the owner of the copy
        guildId: original.guildId,
        isPrivate: true,
      },
    });

    // Duplicate sections with mapping (old section ID -> new section ID)
    const sectionMap = new Map<string, string>();
    for (const section of original.setSections) {
      const newSection = await prisma.setSection.create({
        data: {
          setListId: newSetlist.setListId,
          name: section.name,
          position: section.position,
        },
      });
      sectionMap.set(section.sectionId, newSection.sectionId);
    }

    // Duplicate items with section mapping
    for (const item of original.setItems) {
      await prisma.setItem.create({
        data: {
          setListId: newSetlist.setListId,
          trackId: item.trackId,
          position: item.position,
          customTuning: item.customTuning,
          customNotes: item.customNotes,
          customDuration: item.customDuration,
          sectionId: item.sectionId ? sectionMap.get(item.sectionId) : null,
        },
      });
    }

    // Fetch and return the complete new setlist
    return await prisma.setList.findUnique({
      where: { setListId: newSetlist.setListId },
      include: {
        setItems: {
          include: {
            track: true,
            section: true,
          },
          orderBy: { position: 'asc' },
        },
        setSections: {
          orderBy: { position: 'asc' },
        },
        shares: true,
      },
    });
  },

  /**
   * Add a track to a setlist with optional custom overrides
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
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
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Verify setlist exists and user has edit permission
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist) {
      throw new Error('Setlist not found');
    }

    if (setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can modify items');
    }

    // 2. Verify track exists
    const track = await prisma.track.findUnique({
      where: { trackId: data.trackId },
    });

    if (!track) {
      throw new Error('Track not found');
    }

    // 3. If position not provided, get max position + 1
    let position = data.position;
    if (position === undefined) {
      const maxItem = await prisma.setItem.findFirst({
        where: { setListId: setlistId },
        orderBy: { position: 'desc' },
      });
      position = maxItem ? maxItem.position + 1 : 0;
    }

    // 4. Create SetItem
    const newItem = await prisma.setItem.create({
      data: {
        setListId: setlistId,
        trackId: data.trackId,
        position,
        customTuning: data.customTuning,
        customNotes: data.customNotes,
        customDuration: data.customDuration,
        sectionId: data.sectionId,
      },
      include: {
        track: true,
        section: true,
      },
    });

    // 5. Broadcast item-added event
    if (app) {
      broadcastService.itemAdded(app, setlistId, newItem, userId, displayName);
    }

    return newItem;
  },

  /**
   * Update a SetItem's custom overrides
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
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
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Get SetItem with setlist relation
    const item = await prisma.setItem.findUnique({
      where: { setItemId },
      include: { setList: true },
    });

    if (!item) {
      throw new Error('SetItem not found');
    }

    // 2. Check ownership
    if (item.setList.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can update items');
    }

    // 3. Update
    const updatedItem = await prisma.setItem.update({
      where: { setItemId },
      data,
      include: {
        track: true,
        section: true,
      },
    });

    // 4. Broadcast item-updated event
    if (app) {
      broadcastService.itemUpdated(app, item.setListId, updatedItem, userId, displayName);
    }

    return updatedItem;
  },

  /**
   * Remove a track from a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
   */
  removeSetItem: async (
    setItemId: string,
    firebaseUid: string,
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Get SetItem with setlist relation
    const item = await prisma.setItem.findUnique({
      where: { setItemId },
      include: { setList: true },
    });

    if (!item) {
      throw new Error('SetItem not found');
    }

    // 2. Check ownership
    if (item.setList.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can delete items');
    }

    // 3. Delete
    await prisma.setItem.delete({
      where: { setItemId },
    });

    // 4. Broadcast item-deleted event
    if (app) {
      broadcastService.itemDeleted(app, item.setListId, setItemId, userId, displayName);
    }

    return { success: true };
  },

  /**
   * Reorder tracks in a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
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
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Verify setlist exists and user has edit permission
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist) {
      throw new Error('Setlist not found');
    }

    if (setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can reorder items');
    }

    // 2. Use transaction to update all positions atomically
    await prisma.$transaction(async (tx) => {
      // Step 1: Move all items to temporary negative positions to avoid unique constraint violations
      for (let i = 0; i < itemPositions.length; i++) {
        await tx.setItem.update({
          where: { setItemId: itemPositions[i].setItemId },
          data: { position: -(i + 1) },
        });
      }

      // Step 2: Update to final positions
      for (const { setItemId, position } of itemPositions) {
        await tx.setItem.update({
          where: { setItemId },
          data: { position },
        });
      }
    });

    // 3. Return updated setlist with items
    const updatedSetlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
      include: {
        setItems: {
          include: {
            track: true,
            section: true,
          },
          orderBy: { position: 'asc' },
        },
      },
    });

    // 4. Broadcast reordered event
    if (app && updatedSetlist) {
      broadcastService.reordered(app, setlistId, updatedSetlist, userId, displayName);
    }

    return updatedSetlist;
  },

  /**
   * Add a section to a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
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
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Verify setlist exists and user has edit permission
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist) {
      throw new Error('Setlist not found');
    }

    if (setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can add sections');
    }

    // 2. If position not provided, get max position + 1
    let position = data.position;
    if (position === undefined) {
      const maxSection = await prisma.setSection.findFirst({
        where: { setListId: setlistId },
        orderBy: { position: 'desc' },
      });
      position = maxSection ? maxSection.position + 1 : 0;
    }

    // 3. Create SetSection
    const newSection = await prisma.setSection.create({
      data: {
        setListId: setlistId,
        name: data.name,
        position,
      },
    });

    // 4. Broadcast section-added event
    if (app) {
      broadcastService.sectionAdded(app, setlistId, newSection, userId, displayName);
    }

    return newSection;
  },

  /**
   * Update a section (name only)
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
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
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Get section with setlist relation
    const section = await prisma.setSection.findUnique({
      where: { sectionId },
      include: { setList: true },
    });

    if (!section) {
      throw new Error('Section not found');
    }

    // 2. Verify section belongs to the setlist
    if (section.setListId !== setlistId) {
      throw new Error('Section does not belong to this setlist');
    }

    // 3. Check ownership
    if (section.setList.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can update sections');
    }

    // 4. Update
    const updateData: { name?: string } = {};
    if (data.name !== undefined) {
      if (data.name.trim().length === 0) {
        throw new Error('Section name cannot be empty');
      }
      updateData.name = data.name.trim();
    }

    const updatedSection = await prisma.setSection.update({
      where: { sectionId },
      data: updateData,
    });

    // 5. Broadcast section-updated event
    if (app) {
      broadcastService.sectionUpdated(app, setlistId, updatedSection, userId, displayName);
    }

    return updatedSection;
  },

  /**
   * Delete a section (unassigns items from the section)
   * @param firebaseUid - Firebase UID of the authenticated user
   * @param app - Elysia app instance for broadcasting WebSocket events
   */
  deleteSection: async (
    setlistId: string,
    sectionId: string,
    firebaseUid: string,
    app?: Elysia<any, any, any, any, any, any>
  ) => {
    const { userId, displayName } = await getUserDetailsFromFirebaseUid(firebaseUid);

    // 1. Get section with setlist relation
    const section = await prisma.setSection.findUnique({
      where: { sectionId },
      include: { setList: true },
    });

    if (!section) {
      throw new Error('Section not found');
    }

    // 2. Verify section belongs to the setlist
    if (section.setListId !== setlistId) {
      throw new Error('Section does not belong to this setlist');
    }

    // 3. Check ownership
    if (section.setList.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can delete sections');
    }

    // 4. Unassign items in this section
    await prisma.setItem.updateMany({
      where: { sectionId },
      data: { sectionId: null },
    });

    // 5. Delete the section
    await prisma.setSection.delete({
      where: { sectionId },
    });

    // 6. Broadcast section-deleted event
    if (app) {
      broadcastService.sectionDeleted(app, setlistId, sectionId, userId, displayName);
    }

    return { success: true };
  },

  /**
   * Create a share link for a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  createShare: async (
    setlistId: string,
    firebaseUid: string,
    permission: 'VIEW_ONLY' | 'CAN_EDIT',
    expiresAt?: Date
  ) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    // 1. Verify setlist exists and user is owner
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist) {
      throw new Error('Setlist not found');
    }

    if (setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can create shares');
    }

    // 2. Generate unique share token
    const shareToken = await (async () => {
      let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let existing = await prisma.setListShare.findUnique({
        where: { shareToken: token },
      });
      while (existing) {
        token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        existing = await prisma.setListShare.findUnique({
          where: { shareToken: token },
        });
      }
      return token;
    })();

    // 3. Create share
    return await prisma.setListShare.create({
      data: {
        setListId: setlistId,
        shareToken,
        permission,
        expiresAt,
        createdBy: userId,
      },
    });
  },

  /**
   * Get all shares for a setlist
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  listShares: async (setlistId: string, firebaseUid: string) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    // 1. Verify setlist exists and user is owner
    const setlist = await prisma.setList.findUnique({
      where: { setListId: setlistId },
    });

    if (!setlist) {
      throw new Error('Setlist not found');
    }

    if (setlist.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can list shares');
    }

    // 2. Get all shares for the setlist
    return await prisma.setListShare.findMany({
      where: { setListId: setlistId },
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            userId: true,
            displayName: true,
            email: true,
          },
        },
      },
    });
  },

  /**
   * Revoke a share link
   * @param firebaseUid - Firebase UID of the authenticated user
   */
  revokeShare: async (setlistId: string, shareId: string, firebaseUid: string) => {
    const userId = await getUserIdByFirebaseUid(firebaseUid);

    // 1. Get share with setlist relation
    const share = await prisma.setListShare.findUnique({
      where: { shareId },
      include: { setList: true },
    });

    if (!share) {
      throw new Error('Share not found');
    }

    // 2. Verify share belongs to the setlist
    if (share.setListId !== setlistId) {
      throw new Error('Share does not belong to this setlist');
    }

    // 3. Check ownership
    if (share.setList.ownerId !== userId) {
      throw new Error('Unauthorized: only the setlist owner can revoke shares');
    }

    // 4. Delete the share
    await prisma.setListShare.delete({
      where: { shareId },
    });

    return { success: true };
  },
};