import { prisma } from '@services';
import type {
  GetGuildsQuery,
  CreateActBody,
  CreateVenueBody,
  CreateClubBody,
  UpdateActBody,
  UpdateVenueBody,
  UpdateClubBody,
  GuildResponse
} from '@types';
import { GuildType } from '@band-together/shared';

export const guildController = {
  /**
   * @summary Get paginated list of guilds by type
   * @description Returns paginated list of guilds (acts, venues, or clubs) with optional search
   * @param {string} guildType - Guild type (ACT, VENUE, or CLUB)
   * @param {GetGuildsQuery} query - Query parameters (page, limit, search)
   * @returns {Object} Paginated list of guilds
   */
  getGuilds: async (guildType: GuildType, query: GetGuildsQuery) => {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const skip = (page - 1) * limit;

    const where: any = { guildType };
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive'
      };
    }

    const [guilds, total] = await Promise.all([
      prisma.guild.findMany({
        where,
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.guild.count({ where })
    ]);

    return { guilds, total, page, limit };
  },

  /**
   * @summary Get single guild by ID
   * @description Returns complete guild details including owner, members, and associated entity
   * @param {string} guildId - Guild ID
   * @returns {Object} Guild with all relations
   */
  getGuildById: async (guildId: string): Promise<GuildResponse> => {
    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: {
        currentOwner: {
          select: {
            userId: true,
            displayName: true,
            avatar: true
          }
        },
        act: true,
        venue: true,
        club: true,
        members: {
          select: {
            userId: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    if (!guild) {
      throw new Error('Guild not found');
    }

    return guild;
  },

  /**
   * @summary Create new act guild
   * @description Creates new act and associated guild in transaction
   * @param {string} firebaseUid - Creator's Firebase UID
   * @param {CreateActBody} data - Act data (name, bio, avatar)
   * @returns {Object} Newly created guild
   */
  createAct: async (firebaseUid: string, data: CreateActBody): Promise<GuildResponse> => {

    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    if (!data.name || data.name.length < 2 || data.name.length > 100) {
      throw new Error('Act name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const act = await tx.act.create({
        data: {
          name: data.name,
          bio: data.bio || null,
          avatar: data.avatar || null
        }
      });

      const guild = await tx.guild.create({
        data: {
          name: data.name,
          guildType: GuildType.ACT,
          createdById: user.userId,
          currentOwnerId: user.userId,
          actId: act.actId,
          members: {
            connect: [{ userId: user.userId }]
          }
        },
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      return guild;
    });

    return result;
  },

  /**
   * @summary Create new venue guild
   * @description Creates new venue and associated guild in transaction
   * @param {string} firebaseUid - Creator's Firebase UID
   * @param {CreateVenueBody} data - Venue data (name, address, city, state, zipCode, avatar)
   * @returns {Object} Newly created guild
   */
  createVenue: async (firebaseUid: string, data: CreateVenueBody): Promise<GuildResponse> => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    if (!data.name || data.name.length < 2 || data.name.length > 100) {
      throw new Error('Venue name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const venue = await tx.venue.create({
        data: {
          name: data.name,
          address: data.address || null,
          city: data.city || null,
          state: data.state || null,
          zipCode: data.zipCode || null,
          avatar: data.avatar || null
        }
      });

      const guild = await tx.guild.create({
        data: {
          name: data.name,
          guildType: GuildType.VENUE,
          createdById: user.userId,
          currentOwnerId: user.userId,
          venueId: venue.venueId,
          members: {
            connect: [{ userId: user.userId }]
          }
        },
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      return guild;
    });

    return result;
  },

  /**
   * @summary Create new club guild
   * @description Creates new club and associated guild in transaction
   * @param {string} firebaseUid - Creator's Firebase UID
   * @param {CreateClubBody} data - Club data (name, description, avatar)
   * @returns {Object} Newly created guild
   */
  createClub: async (firebaseUid: string, data: CreateClubBody): Promise<GuildResponse> => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    if (!data.name || data.name.length < 2 || data.name.length > 100) {
      throw new Error('Club name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const club = await tx.club.create({
        data: {
          name: data.name,
          description: data.description || null,
          avatar: data.avatar || null
        }
      });

      const guild = await tx.guild.create({
        data: {
          name: data.name,
          guildType: GuildType.CLUB,
          createdById: user.userId,
          currentOwnerId: user.userId,
          clubId: club.clubId,
          members: {
            connect: [{ userId: user.userId }]
          }
        },
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      return guild;
    });

    return result;
  },

  /**
   * @summary Update act
   * @description Update act and guild details (owner only)
   * @param {string} firebaseUid - User's Firebase UID
   * @param {string} guildId - Guild ID
   * @param {UpdateActBody} data - Update data
   * @returns {Object} Updated guild
   */
  updateAct: async (firebaseUid: string, guildId: string, data: UpdateActBody): Promise<GuildResponse> => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { act: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== user.userId) {
      throw new Error('Unauthorized: Only guild owner can update');
    }
    if (guild.guildType !== GuildType.ACT) {
      throw new Error('Guild is not an act');
    }

    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      throw new Error('Act name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const guildUpdate: any = {};
      if (data.name) {
        guildUpdate.name = data.name;
      }

      const updatedGuild = await tx.guild.update({
        where: { guildId },
        data: guildUpdate,
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      if (guild.actId) {
        await tx.act.update({
          where: { actId: guild.actId },
          data: {
            ...(data.name && { name: data.name }),
            ...(data.bio !== undefined && { bio: data.bio }),
            ...(data.avatar !== undefined && { avatar: data.avatar })
          }
        });
      }

      return updatedGuild;
    });

    return result;
  },

  /**
   * @summary Update venue
   * @description Update venue and guild details (owner only)
   * @param {string} firebaseUid - User's Firebase UID
   * @param {string} guildId - Guild ID
   * @param {UpdateVenueBody} data - Update data
   * @returns {Object} Updated guild
   */
  updateVenue: async (firebaseUid: string, guildId: string, data: UpdateVenueBody): Promise<GuildResponse> => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { venue: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== user.userId) {
      throw new Error('Unauthorized: Only guild owner can update');
    }
    if (guild.guildType !== GuildType.VENUE) {
      throw new Error('Guild is not a venue');
    }

    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      throw new Error('Venue name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const guildUpdate: any = {};
      if (data.name) {
        guildUpdate.name = data.name;
      }

      const updatedGuild = await tx.guild.update({
        where: { guildId },
        data: guildUpdate,
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      if (guild.venueId) {
        await tx.venue.update({
          where: { venueId: guild.venueId },
          data: {
            ...(data.name && { name: data.name }),
            ...(data.address !== undefined && { address: data.address }),
            ...(data.city !== undefined && { city: data.city }),
            ...(data.state !== undefined && { state: data.state }),
            ...(data.zipCode !== undefined && { zipCode: data.zipCode }),
            ...(data.avatar !== undefined && { avatar: data.avatar })
          }
        });
      }

      return updatedGuild;
    });

    return result;
  },

  /**
   * @summary Update club
   * @description Update club and guild details (owner only)
   * @param {string} firebaseUid - User's Firebase UID
   * @param {string} guildId - Guild ID
   * @param {UpdateClubBody} data - Update data
   * @returns {Object} Updated guild
   */
  updateClub: async (firebaseUid: string, guildId: string, data: UpdateClubBody): Promise<GuildResponse> => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { club: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== user.userId) {
      throw new Error('Unauthorized: Only guild owner can update');
    }
    if (guild.guildType !== GuildType.CLUB) {
      throw new Error('Guild is not a club');
    }

    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      throw new Error('Club name must be between 2 and 100 characters');
    }

    const result = await prisma.$transaction(async (tx) => {
      const guildUpdate: any = {};
      if (data.name) {
        guildUpdate.name = data.name;
      }

      const updatedGuild = await tx.guild.update({
        where: { guildId },
        data: guildUpdate,
        include: {
          currentOwner: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          },
          act: true,
          venue: true,
          club: true,
          members: {
            select: {
              userId: true,
              displayName: true,
              avatar: true
            }
          }
        }
      });

      if (guild.clubId) {
        await tx.club.update({
          where: { clubId: guild.clubId },
          data: {
            ...(data.name && { name: data.name }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.avatar !== undefined && { avatar: data.avatar })
          }
        });
      }

      return updatedGuild;
    });

    return result;
  },

  /**
   * @summary Delete guild
   * @description Delete guild and associated entity (owner only)
   * @param {string} firebaseUid - User's Firebase UID
   * @param {string} guildId - Guild ID
   * @returns {Object} Success response
   */
  deleteGuild: async (firebaseUid: string, guildId: string) => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });
    if (!user) throw new Error('User not found');

    const guild = await prisma.guild.findUnique({
      where: { guildId }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== user.userId) {
      throw new Error('Unauthorized: Only guild owner can delete');
    }

    await prisma.$transaction(async (tx) => {
      // Delete the corresponding entity first
      switch (guild.guildType) {
        case GuildType.ACT:
          if (guild.actId) {
            await tx.act.delete({ where: { actId: guild.actId } });
          }
          break;
        case GuildType.VENUE:
          if (guild.venueId) {
            await tx.venue.delete({ where: { venueId: guild.venueId } });
          }
          break;
        case GuildType.CLUB:
          if (guild.clubId) {
            await tx.club.delete({ where: { clubId: guild.clubId } });
          }
          break;
      }

      // Delete the guild
      await tx.guild.delete({ where: { guildId } });
    });

    return { success: true };
  }
};
