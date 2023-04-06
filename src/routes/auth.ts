import { Router } from "express";
import * as controller from "../controllers/auth";

const router = Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.login);

export { router as AuthRoutes };
