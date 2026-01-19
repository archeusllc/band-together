import { api } from './api';

export const profileService = {
  getProfile: async () => {
    try {
      const { data, error } = await api.profile.get();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
