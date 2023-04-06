import { Express } from "express";
import { AuthRoutes } from "./auth";
import { PollRoutes } from "./poll";

export function AppRouter(app: Express) {
  app.use("/auth", AuthRoutes);
  app.use("/polls", PollRoutes);
}
