import { Router } from 'express';
import {getAllUsers, getUser, deleteUser} from '../../controllers/usersController.js';
import {ROLES_LIST} from '../../config/roles_list.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

const router = Router();
const admin = ROLES_LIST.Admin;

//.get(verifyRoles(admin), getAllUsers)
router.route('/').get(getAllUsers).delete(verifyRoles(admin), deleteUser);
router.route('/:id').get(verifyRoles(admin), getUser);

export default router;