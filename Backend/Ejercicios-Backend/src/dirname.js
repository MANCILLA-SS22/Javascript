import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT"; //Esta sirve para utilizarse al momento de hacer el cifrado del token  --> https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it

// Bcrypt
function createHash(password){ //Generamos el hash.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //genSaltSync genera un Salt de 10 caracteres. Un Salt es un string random que hace que el proceso de hasheo se realice de manera impredecible. Devuelve un string con el password hasheado. El proceso es irreversible
}

function validateHash(user, password){ //Validamos el hash. 
    // console.log(`Datos a validar: user: ${user}, password: ${password}`);
    return bcrypt.compareSync(password, user.password); //compareSync toma primero la clave sin hashear y lo compara con la clave hasheada en la base de datos. Devolvera true o false dependiendo si la clave coincide o no
}

//JSON Web Tokens JWT --> Generate token JWT usando jwt.sign: Primer argumento: objeto a cifrar dentro del JWT Segundo argumento: La llave privada a firmar el token. Tercer argumento: Tiempo de expiración del token.
function generateJWToken(user){ //Generamos el token
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '60s' })
};

function authToken(req, res, next){ //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth: ", authHeader );

    if (!authHeader) return res.status(401).send({ error: "User not authenticated or missing token." });

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.

    jwt.verify(token, PRIVATE_KEY, function(error, credentials){ //Validar token
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        req.user = credentials.user;
        console.log("req.user", req.user);
        next();
    })
};

//LocalStorage_Cookies_PassportJWT
function passportCall(strategy){ // para manejo de errores

    return async function(req, res, next){
        console.log("Entrando a llamar strategy: ", strategy);

        passport.authenticate(strategy, authJWT)(req, res, next); //Colocamos (req, res, next) para que se incoque la funcion a si misma sin necesidad de llamarla desde otro medio.

        function authJWT(err, user, info){ //La funcion interna en passport.authenticate(), por defecto tiene tres parametros que representan el error, el usuario y la informacion.
            console.log("err", err)
            console.log("user", user)
            console.log("info", info)
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

export { __dirname, createHash, validateHash, generateJWToken, authToken, passportCall, authorization, PRIVATE_KEY };