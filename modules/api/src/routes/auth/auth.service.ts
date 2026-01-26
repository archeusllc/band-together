import { prisma } from '@services';

export const authService = {
  /**
   * Find a user by Firebase UID
   */
  findByFirebaseUid: async (firebaseUid: string) => {
    return await prisma.user.findUnique({
      where: { firebaseUid },
    });
  },

  /**
   * Find a user by email
   */
  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Create a new user
   */
  createUser: async (data: {
    email: string;
    displayName: string;
    firebaseUid: string;
  }) => {
    return await prisma.user.create({
      data,
    });
  },
};
