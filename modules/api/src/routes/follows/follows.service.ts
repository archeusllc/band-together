import { prisma } from '@services';
import type { CreateFollowBody } from '@types';

export const followsService = {
  /**
   * Get user's follows
   */
  getFollows: async (firebaseUid: string) => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });

    if (!user) throw new Error('User not found');

    const follows = await prisma.follow.findMany({
      where: { userId: user.userId },
      include: {
        followedUser: true,
        tag: true,
        guild: {
          include: {
            act: true,
            venue: true,
            club: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { follows, total: follows.length };
  },

  /**
   * Follow an entity (User, Tag, or Guild)
   */
  createFollow: async (firebaseUid: string, data: CreateFollowBody) => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });

    if (!user) throw new Error('User not found');

    // Validate entity type and corresponding ID
    if (data.entityType === 'USER' && !data.followedUserId) {
      throw new Error('followedUserId required for USER entity type');
    }
    if (data.entityType === 'TAG' && !data.tagId) {
      throw new Error('tagId required for TAG entity type');
    }
    if (data.entityType === 'GUILD' && !data.guildId) {
      throw new Error('guildId required for GUILD entity type');
    }

    // Check if follow already exists
    const existing = await prisma.follow.findFirst({
      where: {
        userId: user.userId,
        entityType: data.entityType,
        followedUserId: data.followedUserId || null,
        tagId: data.tagId || null,
        guildId: data.guildId || null
      }
    });

    if (existing) {
      throw new Error('Already following this entity');
    }

    // Create follow
    const follow = await prisma.follow.create({
      data: {
        userId: user.userId,
        entityType: data.entityType,
        followedUserId: data.followedUserId || null,
        tagId: data.tagId || null,
        guildId: data.guildId || null
      },
      include: {
        followedUser: true,
        tag: true,
        guild: {
          include: {
            act: true,
            venue: true,
            club: true
          }
        }
      }
    });

    return follow;
  },

  /**
   * Unfollow an entity
   */
  deleteFollow: async (firebaseUid: string, followId: string) => {
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    });

    if (!user) throw new Error('User not found');

    // Verify follow belongs to user
    const follow = await prisma.follow.findUnique({
      where: { followId }
    });

    if (!follow) {
      throw new Error('Follow not found');
    }

    if (follow.userId !== user.userId) {
      throw new Error('Unauthorized to delete this follow');
    }

    await prisma.follow.delete({
      where: { followId }
    });

    return { success: true };
  }
};
