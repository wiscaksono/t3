import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "./routers/users";
import { locationRouter } from "./routers/location";
import { reportRouter } from "./routers/report";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  location: locationRouter,
  report: reportRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
