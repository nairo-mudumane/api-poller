import { Router } from "express";
import * as controller from "../controllers/auth";

const router = Router();

router.post("/signup", controller.Signup);

export { router as AuthRoutes };
