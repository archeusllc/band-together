import { followsService } from './follows.service';
import type { CreateFollowBody } from '@types';

export const followsController = {
  /**
   * Get user's follows
   */
  getFollows: async (firebaseUid: string) => {
    try {
      return await followsService.getFollows(firebaseUid);
    } catch (error) {
      console.error('Get follows error:', error);
      throw error;
    }
  },

  /**
   * Follow an entity (User, Tag, or Guild)
   */
  createFollow: async (firebaseUid: string, data: CreateFollowBody) => {
    try {
      return await followsService.createFollow(firebaseUid, data);
    } catch (error) {
      console.error('Create follow error:', error);
      throw error;
    }
  },

  /**
   * Unfollow an entity
   */
  deleteFollow: async (firebaseUid: string, followId: string) => {
    try {
      return await followsService.deleteFollow(firebaseUid, followId);
    } catch (error) {
      console.error('Delete follow error:', error);
      throw error;
    }
  }
};
