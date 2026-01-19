import Elysia from "elysia";

import { checkDatabase } from '@services';

export const healthRoutes = new Elysia()
  .get("/health", async () => {
    const database = await checkDatabase();

    const status = database ? 'healthy' : 'unhealthy';

    return {
      status,
      timestamp: new Date().toISOString(),
      checks: {
        database: database ? 'ok' : 'failed',
      },
    };
  })
