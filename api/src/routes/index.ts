import Elysia from "elysia";
import { healthRoutes } from "./health.routes";
import { authRoutes } from "./auth";
import { feedRoutes } from "./feed";
import { eventsRoutes } from "./events";
import { followsRoutes } from "./follows";
import { guildsRoutes } from "./guilds";
import { tracksRoutes } from "./tracks";
import { setlistRoutes } from "./setlists";

export const routes = new Elysia()
  .use(healthRoutes)
  .use(authRoutes)
  .use(feedRoutes)
  .use(eventsRoutes)
  .use(followsRoutes)
  .use(tracksRoutes)
  .use(guildsRoutes)
  .use(setlistRoutes)
