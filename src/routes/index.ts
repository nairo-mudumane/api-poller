import { Express } from "express";
import { AuthRoutes } from "./auth";

export function AppRouter(app: Express) {
  app.use("/auth", AuthRoutes);
}
