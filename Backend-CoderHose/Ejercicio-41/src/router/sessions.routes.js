//Usando passport, sessions y JWT
import { Router } from "express";
import passport from "passport";
import { generateJWToken } from "../utils.js";

const router = Router();

// Passport Github
router.get('/github', passport.authenticate("github", { scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), githubcallback); //Este callback TIENE QUE COINCIDIR con el que fijamos en la app de Hithub. Este se encargara de hacer la redireccion final a la ventana de home, una vez que el login haya logrado establecer la secion.

//Passport Local
router.post('/register', passport.authenticate("register", {failureRedirect: "api/session/fail-register"}), register);
router.post('/login', passport.authenticate("login", {failureRedirect: "api/session/fail-login"}), login);
router.get("/fail-register", failRegister);
router.get("/fail-login", failLogin);

async function register(req, res){
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
}

async function login(req, res){
    console.log("User found to login:", req.user);    
    const user = req.user;

    // creamos session con el atributo user con "session" (Metodo 1)
    // req.session.user = { 
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email,
    //     age: user.age
    // };
    // console.log("req.session", req.session);
    // res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });

    // Usando JWT usando Postman - no se usan session (Metodo 2)
    const access_token = generateJWToken(user);  
    console.log("access_token", access_token);
    res.send({ access_token: access_token });    
}

async function githubcallback(req, res){ 
    const user = req.user; console.log("req.user", req.user);
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;  
    res.redirect("/users");
}

function failRegister(req, res){
    res.status(401).send({ error: "Failed to process register!" });
}

function failLogin(req, res){
    res.status(401).send({ error: "Failed to process login!" });
}

export default router;

/* //Sin usar passport y de manera convencional
import { Router } from "express";
import {userModel} from "../models/user.model.js";
import { createHash, validateHash } from "../utils.js";

const router = Router();

router.post('/register', async function(req, res){
    const { first_name, last_name, email, age, password } = req.body;
    console.log("Registrando usuario:", req.body);

    const exist  = await userModel.findOne({email});
    if(exist) return res.status(400).send({status: "error", msg: "Usuario existente!"});

    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password)
    }

    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
});

router.post('/login', async function(req, res){
    const { email, password } = req.body;
    // const user = await userModel.findOne({ email, password }); //Ya que el password no está hasheado, podemos buscarlo directamente
    const user = await userModel.findOne({ email });

    if(!validateHash(user, password)) return res.status(401).send({ status: 'error', error: "Incorrect credentials" });
    if (!user) return res.status(401).send({ status: 'error', error: "Incorrect credentials" })

    console.log(req.session)

    req.session.user = { //creamos session con el atributo user
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({  status: "success",  payload: req.session.user,  message: "¡Primer logueo realizado! :)"  });
});

export default router; */