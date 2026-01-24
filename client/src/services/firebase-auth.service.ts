import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@config/firebase.config';
import { api } from './api';
import type { User } from '@band-together/shared';

export const firebaseAuthService = {
  /**
   * Register a new user with email and password
   */
  register: async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    try {
      console.log('🔐 [register] Creating Firebase user for:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('🔐 [register] Firebase user created:', firebaseUser.uid);

      // Get ID token to send to backend
      const idToken = await firebaseUser.getIdToken();
      console.log('🔐 [register] Got ID token, calling backend...');

      // Create user in backend database
      const { data, error } = await api.auth.register.post({
        email,
        displayName: email.split('@')[0],
        firebaseUid: firebaseUser.uid,
        idToken,
      });

      if (error) {
        console.error('🔐 [register] Backend creation failed, deleting Firebase user:', error);
        // If backend creation fails, we should delete the Firebase user
        await firebaseUser.delete();
        return { user: null, error };
      }

      const userData = (data as any)?.user || data;
      console.log('🔐 [register] Backend user created successfully');
      return { user: userData, error: null };
    } catch (error) {
      console.error('🔐 [register] Error during registration:', error);
      return { user: null, error };
    }
  },

  /**
   * Sign in with email and password
   */
  login: async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
    try {
      console.log('🔐 [login] Signing in with:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('🔐 [login] Firebase user signed in:', firebaseUser.uid);

      // Get ID token to send to backend
      const idToken = await firebaseUser.getIdToken();
      console.log('🔐 [login] Got ID token, calling backend...');

      // Authenticate with backend
      const { data, error } = await api.auth.login.post({
        firebaseUid: firebaseUser.uid,
        idToken,
      });

      if (error) {
        console.error('🔐 [login] Backend authentication failed:', error);
        return { user: null, error };
      }

      const userData = (data as any)?.user || data;
      console.log('🔐 [login] Backend authentication successful');
      return { user: userData, error: null };
    } catch (error) {
      console.error('🔐 [login] Error during login:', error);
      return { user: null, error };
    }
  },

  /**
   * Sign out current user
   */
  logout: async (): Promise<{ error: any }> => {
    try {
      console.log('🔐 [logout] Starting logout - clearing backend session');
      // Clear backend session
      await api.auth.logout.get();
      console.log('🔐 [logout] Backend session cleared, signing out from Firebase');

      // Sign out from Firebase
      await signOut(auth);
      console.log('🔐 [logout] Firebase sign out completed');

      return { error: null };
    } catch (error) {
      console.error('🔐 [logout] Error during logout:', error);
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
    console.log('🔐 [Auth] onAuthStateChanged listener registered');
    return onAuthStateChanged(auth, (user) => {
      console.log('🔐 [Auth] onAuthStateChanged fired:', {
        userExists: !!user,
        uid: user?.uid,
        email: user?.email,
      });
      callback(user);
    });
  },

  /**
   * Get ID token for current user with retry logic for web persistence
   */
  getIdToken: async (): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      console.log('🔐 [getIdToken] Checking auth.currentUser:', {
        userExists: !!user,
        uid: user?.uid,
        email: user?.email,
      });

      if (!user) {
        console.log('🔐 [getIdToken] No currentUser found, returning null');
        return null;
      }

      // Try to get the token, with retry for transient failures
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          console.log(`🔐 [getIdToken] Attempt ${attempt + 1}/3 to get ID token...`);
          const token = await user.getIdToken(true); // Force refresh
          if (token) {
            console.log(`🔐 [getIdToken] Successfully got token on attempt ${attempt + 1}`);
            return token;
          }
        } catch (error) {
          console.warn(`🔐 [getIdToken] Attempt ${attempt + 1} failed:`, error);
          // Wait before retrying
          if (attempt < 2) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }

      console.error('🔐 [getIdToken] All 3 attempts failed, returning null');
      return null;
    } catch (error) {
      console.error('🔐 [getIdToken] Unexpected error:', error);
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
