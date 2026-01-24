import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { dts } from 'elysia-remote-dts'

import { routes } from '@routes';
import { broadcastService } from '@services/broadcast.service';

const { PORT = 3000 } = process.env;

const testPublishers = {}

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

  .get('/testbroadcast', () => {
    console.log('Triggering test broadcast to web-client');

  })
  .ws('testws/:id', {
    open(ws) {
      const { id } = ws.data.params;
      console.log(`WebSocket connected: ${id}`);
      console.log({ params: ws.data.params })

      ws.subscribe(id);

      ws.send(JSON.stringify({ message: `Connected to testws/${id} at ${new Date().toISOString()}` }));

      testPublishers[id] = ws;

      ws.publish(id, JSON.stringify({ message: `This is a published message from testws/${id} at ${new Date().toISOString()}` }));

      setTimeout(() => {
        testPublishers[id].publish(id, JSON.stringify({ message: `This is a delayed message from testws/${id} at ${new Date().toISOString()}` }));
        testPublishers[id].send(JSON.stringify({ message: `Hello from testws/${id} at ${new Date().toISOString()}` }));
      }, 3000)
    },

  })
  .use(routes)
  .use(dts('./src/index.ts'))
  .use(openapi({
    documentation: {
      info: {
        version: '0.1.0',
        title: 'Band Together API',
        description: `API for Band Together application

## Authentication

Protected endpoints require a Bearer token in the Authorization header.

### Getting a Token for Testing

1. Run the client app in development mode
2. Log in with a test account (or register a new one)
3. Navigate to Settings screen (only visible in development)
4. Click the "Copy" button next to "Firebase" to copy your credentials
5. In Swagger UI, click "Authorize" and paste the JSON object

**Note**: Firebase ID tokens expire after 1 hour. If you get 401 errors, refresh the Settings screen to get a new token.

**Why this approach**: Uses real Firebase authentication without any environment-specific bypass code. The tokens work identically to production tokens.`
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Firebase ID token from authenticated user'
          }
        }
      }
    },
    exclude: { paths: ['/'] }
  }))
  .listen(PORT);

// Initialize broadcast service with app instance for WebSocket publishing
broadcastService.setApp(app);

const URL = `${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`;

console.log(`🎸 Band Together API running on ${URL}`);
console.log(`📊 Health check: ${URL}/health`);
console.log(`📜 OpenAPI docs: ${URL}/openapi`);
console.log(`📝 TypeScript definitions: ${URL}/server.d.ts`);

export type App = typeof app;
