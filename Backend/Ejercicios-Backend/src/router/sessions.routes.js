import { Router } from "express";
import { generateJWToken } from "../utils/jwt.js";
import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate("register", {failureRedirect: "api/session/fail-register"}), register);
router.post('/login', passport.authenticate("login", {failureRedirect: "api/session/fail-login"}), login);
router.get("/fail-register", failRegister);
router.get("/fail-login", failLogin);
router.get('/github', passport.authenticate("github", { session:false, scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
router.get("/githubcallback", passport.authenticate('github', { session:false, failureRedirect: '/github/error' }), githubcallback); 

async function login(req, res) {
    console.log("User found to login:", req.user);    
    const user = req.user;

    // creamos session con el atributo user con "session" (Metodo 1)
    req.session.user = { 
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    console.log("req.session", req.session);
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });

    // Usando JWT usando Postman - no se usan session (Metodo 2)
    // const access_token = generateJWToken(user);  
    // console.log("access_token", access_token);
    // res.send({ access_token: access_token });  
};

async function register (req, res) {
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
};

async function githubcallback(req, res){ 
    console.log("GitHub")
    const user = req.user; console.log("req.user", req.user);
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;  
    res.redirect("/");
};

function failRegister(req, res){
    res.status(401).send({ error: "Failed to process register!" });
}

function failLogin(req, res){
    res.status(401).send({ error: "Failed to process login!" });
}


export default router;