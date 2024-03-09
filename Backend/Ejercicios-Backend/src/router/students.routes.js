import { Router } from 'express';
import {getAllStudents, saveStudent} from '../controllers/student.controllers.js'

const router = Router();

router.get('/', getAllStudents);
router.post('/', saveStudent)


export default router;