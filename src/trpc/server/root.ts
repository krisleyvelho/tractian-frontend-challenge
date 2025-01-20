
import { companiesRouter } from "./router/companies";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  companies: companiesRouter
});

export type AppRouter = typeof appRouter;
