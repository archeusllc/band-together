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
      (await prisma.guildMember.findFirst({
        where: {
          guildId: setlist.guildId,
          userId,
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
      description?: string;
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
      (await prisma.guildMember.findFirst({
        where: {
          guildId: original.guildId,
          userId,
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
};