import { Router } from "express";
import {sendWhatsapp} from '../controllers/whatsapp.controller.js';

const router = Router();

router.get("/", sendWhatsapp);

export default router;