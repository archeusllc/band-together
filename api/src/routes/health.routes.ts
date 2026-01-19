import Elysia from "elysia";

import { checkDatabase } from '@services';

export const healthRoutes = new Elysia()
  .get(
    "/health",
    async () => {
      const database = await checkDatabase();

      const status = database ? 'healthy' : 'unhealthy';

      return {
        status,
        timestamp: new Date().toISOString(),
        checks: {
          database: database ? 'ok' : 'failed',
        },
      };
    },
    {
      detail: {
        tags: ['Health'],
        summary: 'API Health Check',
        description: 'Verify that the API and database are operational. Returns health status, timestamp, and detailed component checks.',
        responses: {
          200: {
            description: 'Health status returned successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', enum: ['healthy', 'unhealthy'], description: 'Overall health status' },
                    timestamp: { type: 'string', format: 'date-time', description: 'ISO 8601 timestamp of health check' },
                    checks: {
                      type: 'object',
                      properties: {
                        database: { type: 'string', enum: ['ok', 'failed'], description: 'Database connectivity status' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
  )
