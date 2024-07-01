import { Router } from 'express';
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from '../../controllers/employeesController.js';
import {ROLES_LIST} from '../../config/roles_list.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

const router = Router();
const admin = ROLES_LIST.Admin;
const editor = ROLES_LIST.Editor

router.route('/')
.get(getAllEmployees)
.post(verifyRoles(admin, editor), createNewEmployee)
.put(verifyRoles(admin, editor), updateEmployee)
.delete(verifyRoles(admin), deleteEmployee);

router.route('/:id').get(getEmployee);

export default router;