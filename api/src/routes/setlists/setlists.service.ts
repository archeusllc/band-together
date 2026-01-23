import { prisma } from '@services/prisma.service';

export const setlistService = {
  /**
   * Create a new setlist for the authenticated user
   */
  createSetlist: async (
    ownerId: string,
    name: string,
    description?: string,
    guildId?: string
  ) => {
    return await prisma.setList.create({
      data: {
        name,
        description,
        ownerId,
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
   */
  getUserSetlists: async (userId: string) => {
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
   */
  getSetlistById: async (
    setlistId: string,
    userId?: string,
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

    // Check permissions
    const isOwner = userId && setlist.ownerId === userId;
    const isGuildMember =
      userId &&
      setlist.guildId &&
      (await prisma.guild.findFirst({
        where: {
          guildId: setlist.guildId,
          members: {
            some: {
              userId,
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
   */
  updateSetlist: async (
    setlistId: string,
    userId: string,
    updates: {
      name?: string;
      description?: string | null;
      guildId?: string | null;
    }
  ) => {
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
   */
  deleteSetlist: async (setlistId: string, userId: string) => {
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
   */
  duplicateSetlist: async (setlistId: string, userId: string) => {
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
    return await prisma.setItem.create({
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
    return await prisma.setItem.update({
      where: { setItemId },
      data,
      include: {
        track: true,
        section: true,
      },
    });
  },

  /**
   * Remove a track from a setlist
   */
  removeSetItem: async (
    setItemId: string,
    userId: string
  ) => {
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

    return { success: true };
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
    return await prisma.setList.findUnique({
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
    return await prisma.setSection.create({
      data: {
        setListId: setlistId,
        name: data.name,
        position,
      },
    });
  },

  /**
   * Update a section (name only)
   */
  updateSection: async (
    setlistId: string,
    sectionId: string,
    userId: string,
    data: {
      name?: string;
    }
  ) => {
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

    return await prisma.setSection.update({
      where: { sectionId },
      data: updateData,
    });
  },

  /**
   * Delete a section (unassigns items from the section)
   */
  deleteSection: async (
    setlistId: string,
    sectionId: string,
    userId: string
  ) => {
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

    return { success: true };
  },

  /**
   * Create a share link for a setlist
   */
  createShare: async (
    setlistId: string,
    userId: string,
    permission: 'VIEW_ONLY' | 'CAN_EDIT',
    expiresAt?: Date
  ) => {
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
   */
  listShares: async (setlistId: string, userId: string) => {
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
   */
  revokeShare: async (setlistId: string, shareId: string, userId: string) => {
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