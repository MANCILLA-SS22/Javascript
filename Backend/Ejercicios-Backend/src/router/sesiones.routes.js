import { Router } from 'express';
import {register, login, current, unprotectedLogin, unprotectedCurrent} from '../controllers/sesiones.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', current);
router.get('/unprotectedLogin', unprotectedLogin);
router.get('/unprotectedCurrent', unprotectedCurrent);

export default router;