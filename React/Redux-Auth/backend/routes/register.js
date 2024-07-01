import { Router } from 'express';
import {handleNewUser} from '../controllers/registerController.js';

const router = Router();

router.post('/', handleNewUser);

export default router;