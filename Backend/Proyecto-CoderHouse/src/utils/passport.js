import passport from "passport"

function passportCall(strategy){ // para manejo de errores
    return function(req, res, next){
        // console.log("Entrando a llamar strategy: ", strategy);
        passport.authenticate(strategy, function (err, user, info){
            if (err) return next(err);
            if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() });

            // console.log("Usuario obtenido del strategy: ", user);
            req.user = user;
            next();
        })(req, res, next);
    }
};

function authorization(role){ // para manejo de Auth
    return function (req, res, next){
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")

        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
        }
        next()
    }
};

export {passportCall, authorization}