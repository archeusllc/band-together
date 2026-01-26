import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, updateApiClientBaseUrl } from '../services/apiClient';

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('adminToken');
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token is still valid on mount
    if (token) {
      // Token is loaded from localStorage
    }
    setLoading(false);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      updateApiClientBaseUrl();
      const data = await apiClient.auth.login(email, password);
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
