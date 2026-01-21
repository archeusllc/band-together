import { edenTreaty } from '@elysiajs/eden';
// TODO: Fix type generation for monorepo - using @ts-ignore as workaround
// The generated API types have issues with Elysia type serialization in monorepo context
// See: shared/generated/api-types/server.d.ts for details

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
// @ts-ignore - Type generation issues in monorepo
export const api: any = edenTreaty(apiBaseUrl);
