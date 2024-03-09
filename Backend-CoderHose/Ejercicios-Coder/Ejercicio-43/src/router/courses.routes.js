import { Router } from 'express';
import {getAllCourses, saveCourse} from '../controllers/courses.controllers.js'

const router = Router();

router.get('/', getAllCourses);
router.post('/', saveCourse);

export default router;