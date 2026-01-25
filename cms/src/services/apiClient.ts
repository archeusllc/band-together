import axios, { AxiosInstance, AxiosError } from 'axios';
import { Environment } from '../contexts/EnvironmentContext';

const ENV_URLS: Record<Environment, string> = {
  development: 'http://localhost:3001',
  staging: 'https://band-together-staging.fly.dev',
  production: 'https://bandtogether.fake',
};

const getApiUrl = (): string => {
  const env = (localStorage.getItem('adminEnvironment') || 'development') as Environment;
  return ENV_URLS[env];
};

let axiosInstance: AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: { 'Content-Type': 'application/json' },
});

// Add Bearer token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Update instance when environment changes
export const updateApiClientBaseUrl = () => {
  axiosInstance.defaults.baseURL = getApiUrl();
};

// API Response types
interface TrackResponse {
  trackId: string;
  title: string;
  artist: string;
  type: string;
  duration?: number;
  tuning?: string;
  isActive: boolean;
  createdAt: string;
}

interface TagResponse {
  tagId: string;
  name: string;
  category?: string;
  createdAt: string;
}

interface LoginResponse {
  token: string;
}

interface TracksListResponse {
  tracks: TrackResponse[];
  total: number;
  limit: number;
  offset: number;
}

interface TagsListResponse {
  tags: TagResponse[];
  total: number;
  categories?: string[];
}

interface ImportResponse {
  success: boolean;
  message: string;
  count?: number;
}

interface SpotifySearchResponse {
  tracks: Array<{
    id: string;
    name: string;
    artist: string;
    duration: number;
  }>;
}

// API Client
export const apiClient = {
  auth: {
    login: async (email: string, password: string): Promise<LoginResponse> => {
      const { data } = await axiosInstance.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return data;
    },
  },

  tracks: {
    list: async (params?: {
      q?: string;
      type?: string;
      active?: string;
      limit?: number;
      offset?: number;
    }): Promise<TracksListResponse> => {
      const { data } = await axiosInstance.get<TracksListResponse>('/tracks', {
        params,
      });
      return data;
    },

    get: async (trackId: string): Promise<TrackResponse> => {
      const { data } = await axiosInstance.get<TrackResponse>(
        `/tracks/${trackId}`
      );
      return data;
    },

    update: async (
      trackId: string,
      updates: Partial<TrackResponse>
    ): Promise<TrackResponse> => {
      const { data } = await axiosInstance.patch<TrackResponse>(
        `/tracks/${trackId}`,
        updates
      );
      return data;
    },

    delete: async (trackId: string): Promise<void> => {
      await axiosInstance.delete(`/tracks/${trackId}`);
    },

    restore: async (trackId: string): Promise<TrackResponse> => {
      const { data } = await axiosInstance.patch<TrackResponse>(
        `/tracks/${trackId}/restore`
      );
      return data;
    },

    addTag: async (trackId: string, tagId: string): Promise<void> => {
      await axiosInstance.post(`/tracks/${trackId}/tags/${tagId}`);
    },

    removeTag: async (trackId: string, tagId: string): Promise<void> => {
      await axiosInstance.delete(`/tracks/${trackId}/tags/${tagId}`);
    },
  },

  tags: {
    list: async (params?: { category?: string }): Promise<TagsListResponse> => {
      const { data } = await axiosInstance.get<TagsListResponse>('/tags', {
        params,
      });
      return data;
    },

    create: async (tagData: { name: string; category?: string }): Promise<TagResponse> => {
      const { data } = await axiosInstance.post<TagResponse>('/tags', tagData);
      return data;
    },

    delete: async (tagId: string): Promise<void> => {
      await axiosInstance.delete(`/tags/${tagId}`);
    },

    getCategories: async (): Promise<string[]> => {
      const { data } = await axiosInstance.get<{ categories: string[] }>(
        '/tags/categories/list'
      );
      return data.categories;
    },
  },

  import: {
    csv: async (file: File): Promise<ImportResponse> => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axiosInstance.post<ImportResponse>(
        '/import/csv',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    },

    json: async (jsonData: unknown): Promise<ImportResponse> => {
      const { data } = await axiosInstance.post<ImportResponse>(
        '/import/json',
        jsonData
      );
      return data;
    },

    template: async (): Promise<Blob> => {
      const { data } = await axiosInstance.get<Blob>('/import/csv-template', {
        responseType: 'blob',
      });
      return data;
    },
  },

  spotify: {
    search: async (query: string): Promise<SpotifySearchResponse> => {
      const { data } = await axiosInstance.get<SpotifySearchResponse>(
        '/spotify/search',
        {
          params: { q: query },
        }
      );
      return data;
    },
  },

  health: {
    check: async (): Promise<'healthy' | 'degraded' | 'unhealthy'> => {
      try {
        const { data } = await axiosInstance.get<any>('/');
        if (data && data.status === 'running') {
          return 'healthy';
        }
        return 'degraded';
      } catch (error) {
        return 'unhealthy';
      }
    },
  },
};

export type ApiClientError = AxiosError;
