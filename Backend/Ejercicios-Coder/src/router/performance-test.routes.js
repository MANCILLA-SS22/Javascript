import { Router } from "express";
import { simple, complex } from "../controllers/performance-test.controller.js";

const router = Router();

router.get("/operation/simple", simple);
router.get("/operation/complex", complex);

export default router;