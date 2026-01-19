import { prisma } from '@/services';
import { firebaseAuth } from '@/config/firebase-admin.config';

export const authController = {
  /**
   * Register a new user
   */
  register: async (data: {
    email: string;
    displayName?: string;
    firebaseUid: string;
    idToken: string;
  }) => {
    try {
      // Verify the ID token
      const decodedToken = await firebaseAuth.verifyIdToken(data.idToken);

      if (decodedToken.uid !== data.firebaseUid) {
        throw new Error('Token UID mismatch');
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { firebaseUid: data.firebaseUid },
      });

      if (existingUser) {
        return existingUser;
      }

      // Create new user
      const user = await prisma.user.create({
        data: {
          email: data.email,
          displayName: data.displayName || data.email.split('@')[0],
          firebaseUid: data.firebaseUid,
        },
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user (verify token and return user data)
   */
  login: async (data: { firebaseUid: string; idToken: string }) => {
    try {
      // Verify the ID token
      const decodedToken = await firebaseAuth.verifyIdToken(data.idToken);

      if (decodedToken.uid !== data.firebaseUid) {
        throw new Error('Token UID mismatch');
      }

      // Find user in database
      const user = await prisma.user.findUnique({
        where: { firebaseUid: data.firebaseUid },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Get current user (from Firebase UID)
   */
  me: async (firebaseUid: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  /**
   * Logout (no-op since Firebase handles token invalidation)
   */
  logout: async () => {
    // Firebase tokens are stateless, so logout is handled client-side
    return true;
  },

  /**
   * Password reset (trigger Firebase password reset email)
   */
  resetPassword: async (email: string) => {
    try {
      // Firebase password reset is handled client-side
      // This endpoint can be used to verify email exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return !!user;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  },
};
