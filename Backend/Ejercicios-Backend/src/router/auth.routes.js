import { Router } from "express";
import authByEmailPwd from "../utils/auth.js";

const router = Router();

router.get("/publico", function(req, res){ //Endpoint público (No autenticado y no autorizado)
  res.send("Endpoint público")
});

router.post("/autenticado", function(req, res){ //Endpoint autenticado para todo usuario registrado
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

router.post("/autorizado", function(req, res){ //Endpoint autorizado a administradores
  const { email, password } = req.body;

  if (!email || !password) return res.send(400);

  try {
    const user = authByEmailPwd(email, password);

    if (user.role !== "admin") return res.send(403);

    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default router;
