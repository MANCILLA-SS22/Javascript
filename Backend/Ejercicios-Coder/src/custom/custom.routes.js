import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from '../dirname.js';

class CustomRouter { //Esta es la clase padre, y CustomRouter es la clase que hereda de esta misma clase.
    constructor() {
        this.router = Router();
        this.init(); //Esto sirve para inicializar la funcion init proveniente de users.extend.routes.js
    };
    
    init(){}; //Esta tipo de inicialilzacion se usa para las clases heredadas.

    getRouter() {
        return this.router; //this.router.get("/path", middleware1, middleware2, function callback(req, res){})
    };

    //GET
    get(path, policies, ...callbacks) { // (1)
        // console.log("Entrando por GET a custom router con Path: " + path, " y policies: ", policies); 
        this.router.get(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks)); // (2)
    }

    // POST
    post(path, policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    // PUT
    put(path, policies, ...callbacks){ 
        this.router.put(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    // DELETE
    delete(path, policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };    

    handlePolicies(policies){
        return function(req, res, next){
            console.log("Politicas a evaluar: ", policies);
            if(policies[0] === "PUBLIC") return next();

            //Cuando es una ruta protegida, hacemos el proceso de extraccion del token
            const authHeader = req.headers.authorization; console.log("Token present in header auth: ", authHeader);
            if(!authHeader) return res.status(401).send({error: "User not authenticcated or missing token!"});
            const token = authHeader.split(' ')[1]//Se hace el split para retirar la palabra Bearer.

            //Validamos si es un token valido
            jwt.verify(token, PRIVATE_KEY, function(error, credential){
                if(error) return res.status(403).send({error: "Token invalid, Unauthorized!"})
                
                const user = credential.user;

                // Preguntamos si dentro del array policies se encuentra el user.role que me esta llegando con este usuario
                if( !policies.includes(user.role.toUpperCase()) )return res.status(401).send({error: "El usuario no tiene privilegios, revisa tus roles!"});

                // si el user.role se encuentra dentro de policies, podes ingresar
                req.user = user;
                console.log(req.user);
                next();
            });
        }
    }

    //es una función que agregará al objeto res, métodos adicionales de envío de información, donde seteamos status específicos, cuerpos específicos e intenciones específicas. 
    generateCustomRespones(){
        return function(req, res, next){

            //Agregamos estas propiedades a cada uno de los 5 objetos, los cuales inicialmente no existen
            res.sendSuccess = function(payload){
                res.status(200).send({status: "Success", payload})
            }
            res.sendInternalServerError = function(error){
                res.status(500).send({status: "Error", error})
            }
            res.sendClientError = function(error){
                res.status(400).send({status: "Client error ", error})
            }
            res.sendAuthorizedError = function(error){
                res.status(403).send({status: "User not authenticated or missing token", error})
            }
            res.sendForbiddenError = function(error){
                res.status(403).send({status: "Invalid token or used with no access, unauthorized, please check your roles!", error})
            }
            next();
        }
    };

    applyCallbacks(callbacks) { // (3)
        const val = callbacks.map(function(callback){ // (4)
            return async function(...params){ // (5)
                try {                    
                    await callback.apply(this, params); // (6)
                } catch (error) {
                    console.error(error);                
                    params[1].status(500).send(error); //params[1] hace referencia al res. Si usamos params[0], haremos referencia al req.
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

