import { Router } from "express";
import { logger } from "../controllers/logger.controller.js";
const router = Router();

router.get("/", logger)

export default router;