import { Router } from 'express';
import { suma1, suma2 } from '../controllers/fork.controller.js';

const router = Router();
router.get('/suma_01', suma1);
router.get("/suma_02", suma2);

export default router;