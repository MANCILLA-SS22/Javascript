import { Router } from "express";
import {getUsers, saveUser, fakeUser } from '../controllers/users.controller.js';
import { errorHandler } from "../services/errors/middlewares/index.js";

const router = Router();

router.get("/", getUsers);
router.post("/", saveUser);
router.get("/test", fakeUser);
router.use(errorHandler); // Para implementar este middleware se debe COMENTAR el try/catch del la funcion saveUser() del controllers/users.controller.js

export default router;