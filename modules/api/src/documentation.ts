import openapi from "@elysiajs/openapi";
import Elysia from "elysia";

export const documentation = new Elysia()
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
  }));
