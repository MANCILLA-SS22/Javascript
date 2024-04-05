import { Router } from "express";
import { jwtVerify, SignJWT } from "jose";
import { USERS_BBDD } from "../../data/bbdd.js";
import validateLoginDTO from "../database/dto/validate_login_dto.js";
import authByEmailPwd from "../utils/auth.js";

const router = Router();

router.post("/login", validateLoginDTO, async function(req, res){ //Login con email y password
  const { email, password } = req.body;
  try {
    const { guid } = authByEmailPwd(email, password);
    const jwtConstructor = new SignJWT({ guid }); //GENERAR TOKEN Y DEVOLVER TOKEN

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({ alg: "HS256", typ: "JWT" }).setIssuedAt().setExpirationTime("1h").sign(encoder.encode("JWT_PRIVATE_KEY"));

    return res.send({ jwt });
  } catch (err) {
    return res.sendStatus(401);
  }
});

router.get("/profile", async function(req, res){ //Solicitud autenticada con token para obtener el perfil del usuario
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify( authorization, encoder.encode("JWT_PRIVATE_KEY") );

    const user = USERS_BBDD.find((user) => user.guid === payload.guid);
    if (!user) return res.sendStatus(401);

    delete user.password;
    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default router;
