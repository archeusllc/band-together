import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { firebaseAuthService, api } from '@services';
import type { User } from '@band-together/types';
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
    try {
      const idToken = await firebaseAuthService.getIdToken();

      if (!idToken) {
        setUser(null);
        return;
      }

      // Fetch user data from backend using eden treaty
      const { data, error } = await api.auth.me.get({
        $headers: {
          authorization: `Bearer ${idToken}`,
        },
      });

      if (error) {
        // Don't clear user on backend error - might be transient
        return;
      }

      if (!data) {
        setUser(null);
        return;
      }

      setUser(data as User);
    } catch (error) {
      // Don't clear user on unexpected error - might be transient
    }
  }, []);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = firebaseAuthService.onAuthStateChanged(async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // User is signed in, fetch user data from backend
        // Add a small delay on initial load to ensure Firebase has fully restored the session
        // This is especially important on web where persistence uses IndexedDB
        await new Promise(resolve => setTimeout(resolve, 100));
        await refreshUser();
      } else {
        // User is signed out
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { user: userData, error } = await firebaseAuthService.login(email, password);

    if (userData && !error) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    const { user: userData, error } = await firebaseAuthService.register(email, password);

    if (userData && !error) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await firebaseAuthService.logout();
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
