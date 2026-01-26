import { api } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await api.auth.login.post({ email, password });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  register: async (email: string, password: string) => {
    try {
      const { data, error } = await api.auth.register.post({
        email,
        password
      });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  logout: async () => {
    try {
      const { data, error } = await api.auth.logout.get();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  // Placeholder for session check - may need to implement on API side
  checkSession: async () => {
    try {
      // For now, return null as there's no session endpoint
      // The app will rely on cookie-based auth
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
