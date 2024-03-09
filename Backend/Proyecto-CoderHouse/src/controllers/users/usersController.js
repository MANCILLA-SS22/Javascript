import Route from "../../router/class.routes.js"
import passport from "passport";
import { generateJWToken } from "../../utils.js";

class AuthRouter extends Route {
    init(){
        this.post('/login', ['PUBLIC'], passport.authenticate("login", {session:false, failureRedirect: "api/auth/fail-failLogin"}), login); // Eliminar "session:false" si se trabaja con passport. Agregar "session:false" si se trabaja con JWT
        this.post('/register', ['PUBLIC'], passport.authenticate("register", {session:false, /* failureRedirect: "api/auth/fail-register" */}), register);
        this.get('/logout', ['PUBLIC'],  logout);
        
        this.get('/github', ['PUBLIC'], passport.authenticate("github", {session:false, scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
        this.get("/githubcallback", ['PUBLIC'], passport.authenticate('github', { session:false, failureRedirect: '/github/error' }), githubcallback); //Este callback TIENE QUE COINCIDIR con el que fijamos en la app de Hithub. Este se encargara de hacer la redireccion final a la ventana de home, una vez que el login haya logrado establecer la secion.
        
        this.get("/fail-register", ['PUBLIC'], failRegister);
        this.get("/fail-login", ['PUBLIC'], failLogin);
        
        async function login(req, res){
            try {
                if(!req.user) return res.status(400).json({message: "Invalid credentials"});
        
                // console.log("User found to login:", req.user);    
                const user = req.user;
        
                //Trabajando con JWT
                const tokenUser = { // creamos un usuario con un token generado (Metodo 2)
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    role: user.role
                };
        
                const access_token = generateJWToken(tokenUser); 
                res.cookie('jwtCookieToken', access_token, { maxAge: 24*60*60*1000, httpOnly: false } ) //Aqui se almacena la cookie
                res.sendSuccess(req.user);
                // res.send({ message: "Login success!!"});
        
            } catch (error) {
                return res.status(400).send({status: "error", msg: "Usuario existente!"});
            }
        };
        
        async function register(req, res){
            console.log("Registrando usuario");
            res.status(201).send({ status: "success", message: "Usuario creado con extito." });
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
            res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: false } ) //Aqui se almacena la cookie
            res.redirect("/");
        }
        
        function logout(req,res){ //http://localhost:5500/api/auth/logout
            res.clearCookie("jwtCookieToken").redirect("/login");
            
        }
        
        function failRegister(req, res){
            res.status(401).send({ error: "Failed to process register!" });
        }
        
        function failLogin(req, res){
            res.status(401).send({ error: "Failed to process login!" });
        }
    }
}

export default AuthRouter;