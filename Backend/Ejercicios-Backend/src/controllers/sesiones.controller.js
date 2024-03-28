import jwt from 'jsonwebtoken';
import { UsuarioDTO } from '../database/dto/Usuario.dto.js';
import { usuarioService } from '../database/service.js';
import { createHash, validateHash } from "../utils/bcrypt.js"

async function register (req, res){
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usuarioService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = { first_name, last_name, email, password: hashedPassword }
        let result = await usuarioService.create(user);
        console.log(result);
        res.send({ status: "success", payload: result._id });
    } catch (error) {

    }
}

async function login (req, res){
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usuarioService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await validateHash(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
    const userDto = UsuarioDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
    res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" })
}

async function current(req, res){
    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user) return res.send({ status: "success", payload: user });
}

async function unprotectedLogin(req, res){
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usuarioService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await validateHash(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
    const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" })
}

async function unprotectedCurrent(req, res){
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })
}

export { register, login, current, unprotectedLogin, unprotectedCurrent}