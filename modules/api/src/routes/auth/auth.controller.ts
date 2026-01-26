import { firebaseAuth } from '@config/firebase-admin.config';
import { authService } from './auth.service';

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
      const existingUser = await authService.findByFirebaseUid(data.firebaseUid);

      if (existingUser) {
        return existingUser;
      }

      // Create new user
      const user = await authService.createUser({
        email: data.email,
        displayName: data.displayName || data.email.split('@')[0],
        firebaseUid: data.firebaseUid,
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user (verify token and return user data)
   * Creates a database record for Firebase-registered users if missing
   */
  login: async (data: { firebaseUid: string; idToken: string }) => {
    try {
      // Verify the ID token
      const decodedToken = await firebaseAuth.verifyIdToken(data.idToken);

      if (decodedToken.uid !== data.firebaseUid) {
        throw new Error('Token UID mismatch');
      }

      // Find user in database
      let user = await authService.findByFirebaseUid(data.firebaseUid);

      // If user doesn't exist, create from verified Firebase token
      if (!user) {
        user = await authService.createUser({
          email: decodedToken.email!,
          displayName: decodedToken.name || decodedToken.email!.split('@')[0],
          firebaseUid: data.firebaseUid,
        });
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
      const user = await authService.findByFirebaseUid(firebaseUid);

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
      const user = await authService.findByEmail(email);

      return !!user;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  },
};
