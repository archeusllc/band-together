import { prisma } from '@/services';
import { firebaseMessaging } from '@/config/firebase-admin.config';

export const notificationController = {
  /**
   * Register a push token
   */
  registerToken: async (data: {
    userId: string;
    token: string;
    platform: string;
    deviceId?: string;
  }) => {
    try {
      // Check if token already exists
      const existingToken = await prisma.pushToken.findUnique({
        where: { token: data.token },
      });

      if (existingToken) {
        // Update existing token
        return await prisma.pushToken.update({
          where: { token: data.token },
          data: {
            userId: data.userId,
            platform: data.platform,
            deviceId: data.deviceId,
            updatedAt: new Date(),
          },
        });
      }

      // Create new token
      return await prisma.pushToken.create({
        data: {
          userId: data.userId,
          token: data.token,
          platform: data.platform,
          deviceId: data.deviceId,
        },
      });
    } catch (error) {
      console.error('Register token error:', error);
      throw error;
    }
  },

  /**
   * Unregister a push token
   */
  unregisterToken: async (token: string) => {
    try {
      await prisma.pushToken.delete({
        where: { token },
      });
      return true;
    } catch (error) {
      console.error('Unregister token error:', error);
      return false;
    }
  },

  /**
   * Send notification to a user
   */
  sendNotification: async (data: {
    userId: string;
    title: string;
    body: string;
    data?: Record<string, any>;
  }) => {
    try {
      // Get all push tokens for the user
      const tokens = await prisma.pushToken.findMany({
        where: { userId: data.userId },
      });

      if (tokens.length === 0) {
        throw new Error('No push tokens found for user');
      }

      // Send to all tokens
      const messages = tokens.map((tokenData) => ({
        notification: {
          title: data.title,
          body: data.body,
        },
        data: data.data,
        token: tokenData.token,
      }));

      const response = await firebaseMessaging.sendEach(messages);

      // Remove invalid tokens
      const invalidTokens = response.responses
        .map((resp, idx) => (resp.success ? null : tokens[idx].token))
        .filter((token): token is string => token !== null);

      if (invalidTokens.length > 0) {
        await prisma.pushToken.deleteMany({
          where: { token: { in: invalidTokens } },
        });
      }

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Send notification error:', error);
      throw error;
    }
  },

  /**
   * Send notification to multiple users
   */
  sendBulkNotification: async (data: {
    userIds: string[];
    title: string;
    body: string;
    data?: Record<string, any>;
  }) => {
    try {
      const tokens = await prisma.pushToken.findMany({
        where: { userId: { in: data.userIds } },
      });

      if (tokens.length === 0) {
        throw new Error('No push tokens found');
      }

      const message = {
        notification: {
          title: data.title,
          body: data.body,
        },
        data: data.data,
        tokens: tokens.map((t) => t.token),
      };

      const response = await firebaseMessaging.sendEachForMulticast(message);

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Send bulk notification error:', error);
      throw error;
    }
  },
};
