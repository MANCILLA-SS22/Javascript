import { Router } from 'express';
import {handleLogin} from '../controllers/authController.js';

const router = Router();

router.post('/', handleLogin);

export default router;