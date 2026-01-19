import { authGuard, userMiddleware } from "@middleware";
import Elysia, { t } from "elysia";

export const profileRoutes = new Elysia()
  .use(userMiddleware)
  .guard({
    beforeHandle: authGuard
  })
  .guard({
    beforeHandle: ({ user }) => {
      if (!user.id) throw new Error('Unauthorized');
    }
  })
  .get(
    "/profile",
    async ({ status, user }) => {
      console.log(`User ID: ${user.id}`);
      return status("OK");
    },
    {
      cookie: t.Cookie({
        token: t.String()
      }),
      user: t.Object({
        id: t.String()
      }),
      detail: {
        tags: ['Profile'],
        summary: 'Retrieve User Profile',
        description: 'Get the profile information for the currently authenticated user. Requires valid JWT authentication token in cookies.',
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: 'User profile retrieved successfully',
          },
          401: {
            description: 'Unauthorized - missing or invalid authentication token or missing user ID',
          },
        },
      },
    }
  );
