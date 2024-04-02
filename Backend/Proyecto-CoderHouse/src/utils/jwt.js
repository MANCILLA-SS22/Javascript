import jwt from 'jsonwebtoken';
import { EXPIRES_IN, PRIVATE_KEY, SECRET_KEY } from '../config/dotenvMain/env.config.js';

const secretKey = PRIVATE_KEY;//JSON Web Tokens JWT --> Generate token JWT usando jwt.sign: Primer argumento: objeto a cifrar dentro del JWT Segundo argumento: La llave privada a firmar el token. Tercer argumento: Tiempo de expiración del token.

function generateJWToken(user){ //Generamos el token
    return jwt.sign({ user }, toString(SECRET_KEY), { expiresIn: EXPIRES_IN})
};

function authToken(req, res, next){ //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    //console.log("Token present in header auth: ", authHeader );

    if (!authHeader) return res.status(401).send({ error: "User not authenticated or missing token." });

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.

    jwt.verify(token, secretKey, function(error, credentials){ //Validar token
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        req.user = credentials.user; 
        //console.log("req.user", req.user);
        next();
    })
};

export {generateJWToken, authToken, secretKey}