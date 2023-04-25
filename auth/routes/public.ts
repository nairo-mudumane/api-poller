import { Router } from "express";
import * as controller from "../controllers/public";

const router = Router();

router.post("/auth/signup", controller.Signup);
router.post("/auth/login", controller.login);

export { router as PublicRoutes };
