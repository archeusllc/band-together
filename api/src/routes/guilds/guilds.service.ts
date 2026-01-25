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
import { GuildType } from '@band-together/types';

export const guildsService = {
  /**
   * Get paginated list of guilds by type
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
   * Get single guild by ID
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
   * Create new act guild
   */
  createAct: async (userId: string, data: CreateActBody): Promise<GuildResponse> => {
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
          createdById: userId,
          currentOwnerId: userId,
          actId: act.actId,
          members: {
            connect: [{ userId }]
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
   * Create new venue guild
   */
  createVenue: async (userId: string, data: CreateVenueBody): Promise<GuildResponse> => {
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
          createdById: userId,
          currentOwnerId: userId,
          venueId: venue.venueId,
          members: {
            connect: [{ userId }]
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
   * Create new club guild
   */
  createClub: async (userId: string, data: CreateClubBody): Promise<GuildResponse> => {
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
          createdById: userId,
          currentOwnerId: userId,
          clubId: club.clubId,
          members: {
            connect: [{ userId }]
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
   * Update act
   */
  updateAct: async (userId: string, guildId: string, data: UpdateActBody): Promise<GuildResponse> => {
    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { act: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== userId) {
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
   * Update venue
   */
  updateVenue: async (userId: string, guildId: string, data: UpdateVenueBody): Promise<GuildResponse> => {
    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { venue: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== userId) {
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
   * Update club
   */
  updateClub: async (userId: string, guildId: string, data: UpdateClubBody): Promise<GuildResponse> => {
    const guild = await prisma.guild.findUnique({
      where: { guildId },
      include: { club: true }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== userId) {
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
   * Delete guild
   */
  deleteGuild: async (userId: string, guildId: string) => {
    const guild = await prisma.guild.findUnique({
      where: { guildId }
    });

    if (!guild) throw new Error('Guild not found');
    if (guild.currentOwnerId !== userId) {
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
