import { prisma } from '@services';
import { guildsService } from './guilds.service';
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

export const guildsController = {
  /**
   * @summary Get paginated list of guilds by type
   * @description Returns paginated list of guilds (acts, venues, or clubs) with optional search
   * @param {string} guildType - Guild type (ACT, VENUE, or CLUB)
   * @param {GetGuildsQuery} query - Query parameters (page, limit, search)
   * @returns {Object} Paginated list of guilds
   */
  getGuilds: async (guildType: GuildType, query: GetGuildsQuery) => {
    return await guildsService.getGuilds(guildType, query);
  },

  /**
   * @summary Get single guild by ID
   * @description Returns complete guild details including owner, members, and associated entity
   * @param {string} guildId - Guild ID
   * @returns {Object} Guild with all relations
   */
  getGuildById: async (guildId: string): Promise<GuildResponse> => {
    return await guildsService.getGuildById(guildId);
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

    return await guildsService.createAct(user.userId, data);
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

    return await guildsService.createVenue(user.userId, data);
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

    return await guildsService.createClub(user.userId, data);
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

    return await guildsService.updateAct(user.userId, guildId, data);
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

    return await guildsService.updateVenue(user.userId, guildId, data);
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

    return await guildsService.updateClub(user.userId, guildId, data);
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

    return await guildsService.deleteGuild(user.userId, guildId);
  }
};
