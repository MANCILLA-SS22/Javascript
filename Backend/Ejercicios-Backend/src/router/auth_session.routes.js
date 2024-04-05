import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../../data/bbdd.js";
import authByEmailPwd from "../utils/auth.js";

const sessions = [];
const router = Router();

//Login con email y password
router.post("/login", function (req, res){
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  try {
    const { guid } = authByEmailPwd(email, password);
    const sessionId = nanoid();
    sessions.push({ sessionId, guid });
    res.cookie("sessionId", sessionId, {httpOnly: true});
    return res.send();
  } catch (err) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticada con sesion para obtener el perfil del usuario
router.get("/profile", function (req, res){
  const { cookies } = req;
  if (!cookies.sessionId) return res.sendStatus(401);

  const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
  if (!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);
  if (!user) return res.sendStatus(401);

  delete user.password;
  
  return res.send(user);
});

export default router;
