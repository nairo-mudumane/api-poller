import { Application, Router } from "express";
import * as controller from "../controllers/poll";
import { useAuth } from "../middleware/auth";

const router = Router();

router.use(useAuth);

router.post("/", controller.create as Application);

export { router as PollRoutes };
