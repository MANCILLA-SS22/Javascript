import passport from 'passport';

//LocalStorage_Cookies_PassportJWT
function passportCall(strategy){ // para manejo de errores
    return async function(req, res, next){
        console.log("Entrando a llamar strategy: ", strategy);

        passport.authenticate(strategy, authJWT)(req, res, next); //Colocamos (req, res, next) para que se invoque la funcion a si misma sin necesidad de llamarla desde otro medio.

        function authJWT(err, user, info){ //La funcion interna en passport.authenticate(), por defecto tiene tres parametros que representan el error, el usuario y la informacion.
            console.log("err", err); console.log("user", user); console.log("info", info);

            if (err) return next(err); // will generate a 500 error
            if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() }); // Generate a JSON response reflecting authentication status

            console.log("Usuario obtenido del strategy: ", user);
            req.user = user;
            next();
        }
    }
};

function authorization(role){ // para manejo de Auth
    return async function (req, res, next){
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")
        if (req.user.role !== role) return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
        next()
    }
};

export {passportCall, authorization}