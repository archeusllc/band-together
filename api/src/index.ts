import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { dts } from 'elysia-remote-dts'

import { routes } from '@routes';

const { PORT = 3000 } = process.env;

const app = new Elysia()
  .use(cors())
  .get('/', () => ({
    message: 'Band Together API',
    status: 'running'
  }))
  .use(routes)
  .use(dts('./src/index.ts'))
  .use(openapi({
    documentation: {
      info: {
        version: '0.1.0',
        title: 'Band Together API',
        description: 'API for Band Together application'
      }
    },
    exclude: { paths: ['/'] }
  }))
  .listen(PORT);

const URL = `${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`;

console.log(`🎸 Band Together API running on ${URL}`);
console.log(`📊 Health check: ${URL}/health`);
console.log(`📜 OpenAPI docs: ${URL}/openapi`);
console.log(`📝 TypeScript definitions: ${URL}/server.d.ts`);

export type App = typeof app;
