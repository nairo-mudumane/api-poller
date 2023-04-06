import { Router } from "express";
import { useAuth } from "../middlewares/auth";

const router = Router();

router.use(useAuth);

router.post("/", (req, res) => res.json({ ok: true }));

export { router as PollRoutes };
