import { Router } from "express";
import {getPayments} from '../controllers/payments.controller.js';

const router = Router();

router.get("/", getPayments);

export default router;