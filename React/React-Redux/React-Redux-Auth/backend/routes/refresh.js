import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const router = Router();

router.get('/', handleRefreshToken);

export default router;