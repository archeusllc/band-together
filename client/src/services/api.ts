import { edenTreaty } from '@elysiajs/eden';
import type { App } from '@band-together/shared';

const getApiUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.band-together.app';
  }
  return 'http://localhost:3000';
};

export const apiBaseUrl = getApiUrl();
export const api = edenTreaty<App>(apiBaseUrl);
