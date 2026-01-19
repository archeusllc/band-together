import Elysia from "elysia";
import { healthRoutes } from "./health.routes";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";
import { notificationRoutes } from "./notification.routes";

export const routes = new Elysia()
  .use(healthRoutes)
  .use(authRoutes)
  .use(profileRoutes)
  .use(notificationRoutes)