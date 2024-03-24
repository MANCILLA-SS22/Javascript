import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js'

const router = Router();

router.get('/', getAllUsers);
router.get('/:uid', getUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);


export default router;



// 1:27:00