import 'dotenv/config';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRoutes } from '@routes/auth';
import { tracksRoutes } from '@routes/tracks';
import { tagsRoutes } from '@routes/tags';
import { importRoutes } from '@routes/import';
import { spotifyRoutes } from '@routes/spotify';

const app = new Elysia()
  .use(
    cors({
      origin: process.env.ADMIN_CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    })
  )
  .get('/', () => ({ status: 'running' }))
  .get('/health', () => ({ status: 'running' }))
  .use(authRoutes)
  .use(tracksRoutes)
  .use(tagsRoutes)
  .use(importRoutes)
  .use(spotifyRoutes)
  .listen(3001);

console.log(`🎵 Admin API running at ${app.server?.hostname}:${app.server?.port}`);
