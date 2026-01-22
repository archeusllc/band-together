import { firebaseGate } from "@middleware";
import Elysia, { t } from "elysia";

export const setlistRoutes = new Elysia()
  .group('/setlist', setlistRoute =>
    setlistRoute
      .use(firebaseGate)
      .post('/', async ({ status }) => {
        // Implementation for creating a setlist goes here
      }, {
        body: t.Object({
          name: t.String(),
          description: t.Optional(t.String()),
          isPublic: t.Optional(t.Boolean()),
          actId: t.Optional(t.String()),
        }),
        detail: {
          tags: ['Setlists'],
          summary: 'Create Setlist',
          description: 'Create a new setlist for the authenticated user.',
          responses: {
            201: {
              description: 'Setlist successfully created',
            },
            401: {
              description: 'Unauthorized - authentication required',
            },
            422: {
              description: 'Unprocessable Entity - invalid input data',
            },
          },
        }
      })
  )