import { Express } from "express";
import { PublicRoutes } from "./public";

export function AppRouter(app: Express) {
  app.use("/accounts", PublicRoutes);
}
