import jwt from 'jsonwebtoken';
import {privateKey} from "../config/config.js";

//JSON Web Tokens JWT --> Generate token JWT usando jwt.sign: Primer argumento: objeto a cifrar dentro del JWT Segundo argumento: La llave privada a firmar el token. Tercer argumento: Tiempo de expiración del token.
function generateJWToken(user){ 
    return jwt.sign({ user }, privateKey, { expiresIn: '60s' }); //Esta sirve para utilizarse al momento de hacer el cifrado del token
};

function authToken(req, res, next){ //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth: ", authHeader );

    if (!authHeader) return res.status(401).send({ error: "User not authenticated or missing token." });

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    jwt.verify(token, privateKey, function(error, credentials){ //Validar token
        if (error) return res.status(403).send({ error  });
        req.user = credentials.user;
        console.log("req.user", req.user);
        next();
    })
};

export {generateJWToken, authToken};

// 1)  Generate token JWT usando jwt.sign
// 2)  Primer argumento: objeto a cifrar dentro del JWT
// 3)  Segundo argumento: La llave privada a firmar el token.
// 4)  Tercer argumento: Tiempo de expiración del token