import CustomRouter from "./custom.routes.js";
import { UserService } from "../services/dao/mongo/users.service.js";
import { createHash, validateHash, generateJWToken } from "../dirname.js"


class UsersExtendRouter extends CustomRouter { //Se exteinde la clase. Es decir, heredar de una clase. O sea, este clase puede acceder a las propiedades de la clase padre, tales como getRouter(). 
    init() { //Dentro del init() ralizamos la inicializacion de nuestras rutas, esto seria el equivalente de decir "router.get()"
        const userService = new UserService();  //EJEMPLO de como se conecta con el CustomRouter --> this.verboHTTP(path, policies, ...callbacks)

        function authToken(req, res, next){ //Middleware de prubea
            console.log("Hello");
            next();
        };

        this.get('/', ["PUBLIC"], function(req, res){ // this.get() proviene del custom.routes.js
            console.log("World!!");
            res.send("Hola coders!!");
        });

        this.get('/currentUser', ["USER", "USER_PREMIUM"], function(req, res){ // this.get() proviene del custom.routes.js
            res.sendSuccess(req.user)
        });

        this.get('/premiumUser', ["USER_PREMIUM"], function(req, res){ // this.get() proviene del custom.routes.js
            res.sendSuccess(req.user)
        });

        this.get('/adminUser', ["ADMIN"], function(req, res){ // this.get() proviene del custom.routes.js
            res.sendSuccess(req.user)
        });

        this.post('/login', ["PUBLIC"], async function(req, res){
            const { email, password } = req.body;
            try {
                const user = await userService.findByUsername(email);
                console.log("Usuario encontrado para login: ", user);
                
                if (!user) {
                    console.warn("User doesn't exists with username: " + email);
                    return res.status(202).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
                }

                if (!validateHash(user, password)) {
                    console.warn("Invalid credentials for user: " + email);
                    return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
                }

                const tokenUser = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    role: user.role
                };
                const access_token = generateJWToken(tokenUser); console.log("access_token", access_token);

                res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true } ) //Aqui se almacena la cookie
                res.send({ message: "Login successful!", access_token: access_token, id: user._id }); //usamos _id porque mongodb lo genera de esa manera, con guin bajo

            } catch (error) {
                console.error(error);
                return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
            }
        });

        this.post("/register", ["PUBLIC"], async function(req, res){
            const { first_name, last_name, email, age, password } = req.body;
            console.log("Registrando usuario: ", req.body);

            const exists = await userService.findByUsername(email);
            
            if (exists) return res.status(400).send({ status: "error", message: "Usuario ya existe." });
            
            const user = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };

            const result = await userService.save(user);
            res.status(201).send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
        });

        this.put('/put', ["ADMIN"], async function(req, res){

        });

        this.delete("/delete", ["ADMIN"], async function(req, res){

        });

    }
}

export default UsersExtendRouter;