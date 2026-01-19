import Elysia from "elysia";

export const userMiddleware = new Elysia()
  .decorate('user', {})
