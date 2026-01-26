import Elysia from "elysia";
import { actsRoutes } from "./acts.routes";
import { clubsRoutes } from "./clubs.routes";
import { venuesRoutes } from "./venues.routes";

export const guildsRoutes = new Elysia()
  .use(actsRoutes)
  .use(clubsRoutes)
  .use(venuesRoutes)