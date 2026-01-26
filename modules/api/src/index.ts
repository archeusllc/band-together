import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { dts } from 'elysia-remote-dts'

import { routes } from '@routes';
import { broadcastService } from '@services/broadcast.service';
import { firebaseWarning } from './config/firebase-admin.config';

import { documentation } from './documentation';

const { PORT = 3000 } = process.env;

const app = new Elysia()
  .use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  }))
  .get('/', () => ({
    message: 'Band Together API',
    status: 'running'
  }))
  .use(routes)
  .use(dts('./src/index.ts'))
  .use(documentation)
  .listen(PORT);

// Initialize broadcast service with app instance for WebSocket publishing
broadcastService.setApp(app);

const URL = `${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`;

console.log(`🎸 Band Together API running on ${URL}`);
console.log(`📊 Health check: ${URL}/health`);
console.log(`📜 OpenAPI docs: ${URL}/openapi`);
console.log(`📝 TypeScript definitions: ${URL}/server.d.ts`);

// Show Firebase warning after other startup messages
if (firebaseWarning) {
  firebaseWarning();
}

export type App = typeof app;
