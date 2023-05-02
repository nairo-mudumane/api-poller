import { Router } from "express";
import * as controller from "../controllers/public";

const router = Router();

router.post("/auth/signup", controller.Signup);
router.post("/auth/login", controller.login);
router.post("/auth/forgot-password", controller.forgotPassword);

export { router as PublicRoutes };
