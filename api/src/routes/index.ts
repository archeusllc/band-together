import Elysia from "elysia";
import { healthRoutes } from "./health.routes";
import { authRoutes } from "./auth.routes";
import { feedRoutes } from "./feed.routes";
import { eventsRoutes } from "./events.routes";
import { followsRoutes } from "./follows.routes";
import { guildsRoutes } from "./guilds.routes";

export const routes = new Elysia()
  .use(healthRoutes)
  .use(authRoutes)
  .use(feedRoutes)
  .use(eventsRoutes)
  .use(followsRoutes)
  .use(guildsRoutes)
