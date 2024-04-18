import { Router } from "express";
import {getClients} from '../controllers/clients.controller.js';

const router = Router();

router.get("/", getClients);

export default router;