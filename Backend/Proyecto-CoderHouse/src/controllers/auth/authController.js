import Route from "../../router/class.routes.js"
import passport from "passport";
import { createHash, validateHash } from "../../utils/bcrypt.js";
import { generateJWToken } from "../../utils/jwt.js";
import { sendNotification } from "../../config/adapter/NodemailerAdapter.js";
import { userService } from "../../database/service.js";
import { v4 } from 'uuid';

class AuthRouter extends Route {
    init(){
        this.post('/login', ['PUBLIC'], passport.authenticate("login", {session:false, failureRedirect: "fail-login"}), login); // Eliminar "session:false" si se trabaja con passport. Agregar "session:false" si se trabaja con JWT
        this.post('/register', ['PUBLIC'], passport.authenticate("register", {session:false, failureRedirect: "fail-register"}), register);
        this.post("/passwordReset", ["PUBLIC"], reset);
        this.post("/passwordUpdate", ["PUBLIC"], passport.authenticate('passwordUpdate', { session: false }), update);
        this.get('/logout', ['PUBLIC'], logout);
        this.get('/github', ['PUBLIC'], passport.authenticate("github", {session:false, scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
        this.get("/githubcallback", ['PUBLIC'], passport.authenticate('github', { session:false, failureRedirect: '/github/error' }), githubcallback); //Este callback TIENE QUE COINCIDIR con el que fijamos en la app de Hithub. Este se encargara de hacer la redireccion final a la ventana de home, una vez que el login haya logrado establecer la secion.
        this.get("/fail-register", ['PUBLIC'], failRegister);
        this.get("/fail-login", ['PUBLIC'], failLogin);
        
        async function login(req, res){
            try {
                if(!req.user) return res.status(400).json({message: "Invalid credentials"});
        
                // console.log("User found to login:", req.user);
                const user = req.user;

                res.clearCookie("jwtCookieToken");
        
                //Trabajando con JWT
                const tokenUser = { // creamos un usuario con un token generado
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    role: user.role,
                    last_connection: user.last_name
                };

                // console.log("tokenUser", tokenUser);

                const date = new Date();
                await userService.updateConnection(req.user.email, date);
        
                const access_token = generateJWToken(tokenUser); 
                res.cookie('jwtCookieToken', access_token, { maxAge: 24*60*60*1000, httpOnly: false } ) //Aqui se almacena la cookie
                res.sendSuccess(req.user);
                // res.send({ message: "Login success!!"});
        
            } catch (error) {
                req.logger.error("User found to login");
                return res.status(400).send({status: "error", msg: "Usuario existente!"});
            }
        };

        async function reset(req, res){
            try {
                const {email} = req.body;
                const token = v4();
                let link = req.protocol+"://"+req.get("host")+`/passwordReset/${token}`;
    
                if (!email) return res.status(400).send('Email not privided');
                res.clearCookie("jwtCookieToken");
    
                const expirationTime = new Date(Date.now()+ 1*60*1000); //El tiempo de expiracion es de 1 hora
                const tokenEmail = {
                    expirationTime: expirationTime,
                    email: email
                };
    
                const access_token = generateJWToken(tokenEmail); 
                res.cookie('emailCookieToken', access_token, { maxAge: expirationTime, httpOnly: false } ); //Aqui se almacena la cookie   
                
                const mensaje = {
                    message: `Para reiniciar la contrasena, dar click en el siguiente link: <a href="${link}"> Reset Password</a>`,
                    subject: "Recuperacion de contrasena"
                };
    
                const emailSend = await sendNotification(email, mensaje);
                res.json({emailSend});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        };

        async function update(req, res){
            try {
                const {pw1} = req.body;
                const {pw2} = req.body;
                const email = req.user.email;
                const user = await userService.findUser(email);
                if(pw1 === pw2){
                    if(validateHash(user, pw1)){
                        res.json({message: "Las nueva y anterior son iguales. Favor de introducir una diferente!!"});
                    }else{
                        await userService.updatePassword(email, createHash(pw1));
                        res.json({message: "La contrasena ha sido actualizada!!"})
                    }
                }else{
                    res.json({message: "Las contrasenas no coinciden!!"})
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        };

        async function register(req, res){
            try {
                console.log("Registrando usuario");
                // req.logger.info("Nuevo usuario registrado");
                res.sendSuccess({ status: "success", message: "Usuario creado con extito." });
            } catch (error) {
                res.sendServerError(500).json({ error: 'Internal server error' })
            }
        };

        async function githubcallback(req, res){ 
            const user = req.user;
            const tokenUser = { // creamos un usuario con un token generado (Metodo 2)
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: user.role,
                last_connection: user.last_name
            };
            // console.log("tokenUser", tokenUser);

            const date = new Date();
            await userService.updateConnection(req.user.email, date);            

            const access_token = generateJWToken(tokenUser); 
            res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: false } ) //Aqui se almacena la cookie
            res.redirect("/");
        };

        function logout(req,res){ //http://localhost:5500/api/auth/logout
            res.clearCookie("jwtCookieToken");
            res.redirect("/login");
        };

        function failRegister(req, res){
            res.status(401).send({ error: "Failed to process register!" });
        };

        function failLogin(req, res){
            res.status(401).send({ error: "Password or username are incorrect. Please verify!" });
        };
    }
}

export default AuthRouter;