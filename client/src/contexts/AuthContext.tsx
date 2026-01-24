import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { firebaseAuthService, api } from '@services';
import type { User } from '@band-together/shared';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = React.useCallback(async () => {
    console.log('📱 [AuthContext.refreshUser] Starting...');
    try {
      const idToken = await firebaseAuthService.getIdToken();
      console.log('📱 [AuthContext.refreshUser] Got ID token:', {
        tokenExists: !!idToken,
        tokenLength: idToken?.length,
      });

      if (!idToken) {
        console.log('📱 [AuthContext.refreshUser] No ID token, clearing user');
        setUser(null);
        return;
      }

      // Fetch user data from backend using eden treaty
      console.log('📱 [AuthContext.refreshUser] Calling api.auth.me.get()...');
      const { data, error } = await api.auth.me.get({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      console.log('📱 [AuthContext.refreshUser] Backend response:', {
        hasData: !!data,
        hasError: !!error,
        errorMessage: error?.toString(),
      });

      if (error) {
        // Don't clear user on backend error - might be transient
        console.warn('📱 [AuthContext.refreshUser] Backend error (not clearing user):', error);
        return;
      }

      if (!data) {
        console.log('📱 [AuthContext.refreshUser] No data returned, clearing user');
        setUser(null);
        return;
      }

      console.log('📱 [AuthContext.refreshUser] Setting user:', {
        userId: (data as User).userId,
        email: (data as User).email,
      });
      setUser(data as User);
    } catch (error) {
      // Don't clear user on unexpected error - might be transient
      console.error('📱 [AuthContext.refreshUser] Unexpected error:', error);
    }
  }, []);

  useEffect(() => {
    console.log('📱 [AuthContext] useEffect started - setting up listener');
    // Listen to Firebase auth state changes
    const unsubscribe = firebaseAuthService.onAuthStateChanged(async (fbUser) => {
      console.log('📱 [AuthContext] Auth state changed callback fired:', {
        userExists: !!fbUser,
        uid: fbUser?.uid,
        email: fbUser?.email,
      });
      setFirebaseUser(fbUser);

      if (fbUser) {
        // User is signed in, fetch user data from backend
        console.log('📱 [AuthContext] Firebase user detected, waiting 100ms for persistence...');
        // Add a small delay on initial load to ensure Firebase has fully restored the session
        // This is especially important on web where persistence uses IndexedDB
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('📱 [AuthContext] Calling refreshUser()...');
        await refreshUser();
        console.log('📱 [AuthContext] refreshUser() completed');
      } else {
        // User is signed out
        console.log('📱 [AuthContext] No Firebase user, clearing user state');
        setUser(null);
      }

      console.log('📱 [AuthContext] Setting loading to false');
      setLoading(false);
    });

    return () => {
      console.log('📱 [AuthContext] useEffect cleanup - unsubscribing');
      unsubscribe();
    };
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('📱 [AuthContext.login] Starting login for:', email);
    const { user: userData, error } = await firebaseAuthService.login(email, password);

    if (userData && !error) {
      console.log('📱 [AuthContext.login] Login successful, setting user');
      setUser(userData);
      return true;
    }
    console.log('📱 [AuthContext.login] Login failed:', error);
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    console.log('📱 [AuthContext.register] Starting registration for:', email);
    const { user: userData, error } = await firebaseAuthService.register(email, password);

    if (userData && !error) {
      console.log('📱 [AuthContext.register] Registration successful, setting user');
      setUser(userData);
      return true;
    }
    console.log('📱 [AuthContext.register] Registration failed:', error);
    return false;
  };

  const logout = async () => {
    console.log('📱 [AuthContext.logout] Starting logout...');
    await firebaseAuthService.logout();
    console.log('📱 [AuthContext.logout] Clearing user state');
    setUser(null);
    setFirebaseUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!firebaseUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
