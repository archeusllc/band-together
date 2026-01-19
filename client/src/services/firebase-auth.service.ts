import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { api } from './api';
import type { User } from '@band-together/shared';

export const firebaseAuthService = {
  /**
   * Register a new user with email and password
   */
  register: async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get ID token to send to backend
      const idToken = await firebaseUser.getIdToken();

      // Create user in backend database
      const { data, error } = await api.auth.register.post({
        email,
        displayName: email.split('@')[0],
        firebaseUid: firebaseUser.uid,
        idToken,
      });

      if (error) {
        // If backend creation fails, we should delete the Firebase user
        await firebaseUser.delete();
        return { user: null, error };
      }

      const userData = (data as any)?.user || data;
      return { user: userData, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  /**
   * Sign in with email and password
   */
  login: async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get ID token to send to backend
      const idToken = await firebaseUser.getIdToken();

      // Authenticate with backend
      const { data, error } = await api.auth.login.post({
        firebaseUid: firebaseUser.uid,
        idToken,
      });

      if (error) {
        return { user: null, error };
      }

      const userData = (data as any)?.user || data;
      return { user: userData, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  /**
   * Sign out current user
   */
  logout: async (): Promise<{ error: any }> => {
    try {
      // Clear backend session
      await api.auth.logout.get();

      // Sign out from Firebase
      await signOut(auth);

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  /**
   * Get current Firebase user
   */
  getCurrentUser: (): FirebaseUser | null => {
    return auth.currentUser;
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Get ID token for current user
   */
  getIdToken: async (): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  },

  /**
   * Update user display name
   */
  updateDisplayName: async (displayName: string): Promise<{ error: any }> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { error: new Error('No user logged in') };
      }

      await updateProfile(user, { displayName });
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};
