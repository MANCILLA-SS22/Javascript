import { Router } from "express";
import passport from "passport";
// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "../config/dotenvMain/env.config.js";
// import { authToken, passportCall, authorization } from "../../utils.js";

class CustomRouter { //Esta es la clase padre, y CustomRouter es la clase que hereda de esta misma clase.
    constructor() {
        this.router = Router();
        this.init(); //Esto sirve para inicializar la funcion init proveniente de users.extend.routes.js
    };
    
    init(){}; //Esta tipo de inicialilzacion se usa para las clases heredadas.

    getRouter() {
        return this.router; //this.router.get("/path", middleware1, middleware2, function callback(req, res){})
    };

    get(path, policies, ...callbacks) { // (1)
        // console.log("Entrando por GET a custom router con Path: " + path, " y policies: ", policies); 
        this.router.get(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks)); // (2)
    }

    post(path, policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    put(path, policies, ...callbacks){ 
        this.router.put(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    delete(path, policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };    

    handlePolicies(policies){
        return function(req, res, next){
            if(policies[0] === "PUBLIC") return next();
            
            passport.authenticate("jwt", { session: false }, authJWT)(req, res, next); //Colocamos (req, res, next) para que se incoque la funcion a si misma sin necesidad de llamarla desde otro medio.
    
            function authJWT(err, user, info){ //La funcion interna en passport.authenticate(), por defecto tiene tres parametros que representan el error, el usuario y la informacion.
                if (err) return next(err); // will generate a 500 error
                if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() }); // Generate a JSON response reflecting authentication status
                console.log("user.role", user.role.toUpperCase());
                console.log("user.role", policies[0])
                if (user.role.toUpperCase() !== policies[0]) return res.status(403).send({ error: "Forbidden. You don`t have enough permissions" });

                // console.log("Usuario obtenido del strategy: ", user);
                req.user = user;
                next();
            }
        // Diferentes metodos de autenticacion con passport
        // Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
        // this.get("/", ['PUBLIC'], authToken, async function(req, res){
        //     const allProducts = await productManager.getProducts();
        //     res.render('profile', {user: req.user, data: allProducts});
        // });   

        //Metodo 2: Usando JWT por Cookie
        // this.get("/", ['PUBLIC'], init, passport.authenticate('jwt', { session: false }), async function(req, res){  //Colocamos session:false debido a que no ocupamos express-session para estos procesos.
        //     const allProducts = await productManager.getProducts();
        //     res.render('profile', {user: req.user, data: allProducts});
        // });           

        // Metodo 3: Usando passport-JWT por Cookie mediante customCall
        // this.get("/", ['PUBLIC'], passportCall('jwt'), async function(req, res){ 
        //     const allProducts = await productManager.getProducts();
        //     res.render('profile', {user: req.user, data: allProducts});
        // });

        // Metodo 4authorization
        // this.get("/", ['PUBLIC'], authorization('ADMIN'), async function(req, res){ 
        //     const allProducts = await productManager.getProducts();
        //     res.render('profile', {user: req.user, data: allProducts});
        // }); 

        }
    }

    //es una función que agregará al objeto res, métodos adicionales de envío de información, donde seteamos status específicos, cuerpos específicos e intenciones específicas. 
    generateCustomRespones(){
        return function(req, res, next){

            res.sendSuccess = function(payload){
                res.status(200).send({status: "Success", payload})
            }

            res.sendServerError = function(error){
                res.status(500).send({status: "Error", error})
            }

            res.sendClientError = function(error){
                res.status(400).send({status: "Client error ", error})
            }

            next();
        }
    };

    applyCallbacks(callbacks) { // (3)
        const val = callbacks.map(function(event){ // (4)
            return async function(...params){ //(5)
                try {                    
                    await event.apply(this, params);  // (6)
                } catch (error) {
                    console.error(error);
                    params[1].status(500).send(error);
                }
            }
        });
        return val;
    };
};

export default CustomRouter;


//Explicacion del get(path, policies, ...callbacks)
//(1) --> El path representa el "path" proveniente de los routers, mientras que el "...callback" se coloca con el spread operator porque representa tanto la funcion asincrona en los routers, como los 
//        middlewares (si es que los tiene), y llegan en formato array.
//(2) --> Esto es equivalente al --> app.use("/", router); que se trabaja de manera convencional, pero ahora con clases y objetos
//(3) --> Esta funcion callback servira para ejecutar los middlewares (si es que hay) y las funciones asincronas provenientes de las peticiones, ya sean router.get(), router.post() , etc.
//(4) --> Se utuliza un map, ya que "callbacks" representas un array con todos esos parametros diferentes al path en las peticiones
//(5) --> Se ejecuta una funcion asincrona para poder capturar ahora los parametros pero de, tanto los middlewares como las funciones asincronas. Estos params representan todos los parametros contenidos 
//        en los callbacks. En este caso, req, res, next, etc.
//(6) --> Apply ejecutara la funcion "callback" (esta representan los middlewares o la funcion asincrona) apuntando directamente a una instancia de la clase, por ello, colocamos this para que se utilice 
//        solo en el contexto de este router, los parametros son internos de cada callback, y estos representan a req, res, next, etc.  
//        callback.apply(this, params);    es equivalente a -->  router.get("/", async function(req, res){}  dependiendo de lo que se este ejecutando, ya que bien podria ser un middleware.