import { Router } from 'express';
import { generateJWToken } from '../utils/jwt.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate("register", {session:false, failureRedirect: "api/jwt/fail-register"}), register);
router.post('/login', passport.authenticate("login", {session:false, failureRedirect: "api/jwt/fail-login"}), login);
router.get("/logout", logout);
router.get("/fail-register", failRegister);
router.get("/fail-login", failLogin);
router.get('/github', passport.authenticate("github", { session:false, scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
router.get("/githubcallback", passport.authenticate('github', { session:false, failureRedirect: '/github/error' }), githubcallback); 
// router.post('/login', login); //Uso de login SIN passport

// async function login(req, res){ //Uso de login SIN passport
//     const { email, password } = req.body;
//     try {
//         const user = await userModel.findOne({ email: email });
//         console.log("Usuario encontrado para login: ", user);

//         if (!user) return res.status(204).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
//         if (!isValidPassword(user, password)) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        
//         const tokenUser = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             role: user.role
//         };
//         const access_token = generateJWToken(tokenUser);
//         console.log(access_token);

//         //1ro con LocalStorage
//         // res.send({ message: "Login successful!", jwt: access_token });

//         // 2do con Cookies
//         res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true }) //No se expone la cookie
//         res.send({ message: "Login success!!" })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
//     }
// };

async function login(req, res){ 
    try {
        if(!req.user) return res.status(400).json({message: "Invalid credentials"});

        console.log("User found to login:", req.isAuthenticated());    
        const user = req.user;

        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };

        const access_token = generateJWToken(tokenUser);  console.log(access_token);

        // 1ro con LocalStorage
        // res.send({ message: "Login successful!", jwt: access_token, id: user._id.toString() });

        // 2do con Cookies
        res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true } ) //Aqui se almacena la cookie
        res.send({ message: "Login success!!", access_token: access_token, id: user._id });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
};

async function githubcallback(req, res){ 
    console.log("GitHub")
    const user = req.user;
    const tokenUser = { // creamos un usuario con un token generado (Metodo 2)
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    };
    const access_token = generateJWToken(tokenUser); 
    console.log(access_token)
    res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: false } ) //Aqui se almacena la cookie
    res.redirect("/usersJwt");
};

async function register(req, res){
    console.log("Registrando usuario")
    res.status(201).send({status: "success", message: "Usuario creado con exito"});
};

function logout(req,res){ //http://localhost:5500/api/jwt/logout
    res.clearCookie("jwtCookieToken").redirect("/login");
}

function failRegister(req, res){
    res.status(401).send({ error: "Failed to process register!" });
}

function failLogin(req, res){
    res.status(401).send({ error: "Failed to process login!" });
}

export default router;