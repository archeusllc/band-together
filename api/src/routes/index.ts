import Elysia from "elysia";
import { healthRoutes } from "./health.routes";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";
import { feedRoutes } from "./feed.routes";
import { eventsRoutes } from "./events.routes";
import { followsRoutes } from "./follows.routes";
import { actsRoutes } from "./acts.routes";
import { venuesRoutes } from "./venues.routes";
import { clubsRoutes } from "./clubs.routes";

export const routes = new Elysia()
  .use(healthRoutes)
  .use(authRoutes)
  .use(profileRoutes)
  .use(feedRoutes)
  .use(eventsRoutes)
  .use(followsRoutes)
  .use(actsRoutes)
  .use(venuesRoutes)
  .use(clubsRoutes);