import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT"; //Esta sirve para utilizarse al momento de hacer el cifrado del token

// Bcrypt
function createHash(password){ //Generamos el hash.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //genSaltSync genera un Salt de 10 caracteres. Un Salt es un string random que hace que el proceso de hasheo se realice de manera impredecible. Devuelve un string con el password hasheado. El proceso es irreversible
}

function validateHash(user, password){ //Validamos el hash. 
    return bcrypt.compareSync(password, user.password); //compareSync toma primero la clave sin hashear y lo compara con la clave hasheada en la base de datos. Devolvera true o false dependiendo si la clave coincide o no
}


//JSON Web Tokens JWT --> Generate token JWT usando jwt.sign: Primer argumento: objeto a cifrar dentro del JWT Segundo argumento: La llave privada a firmar el token. Tercer argumento: Tiempo de expiración del token.
function generateJWToken(user){ //Generamos el token
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
};

function authToken(req, res, next){ //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth: ", authHeader );

    if (!authHeader) return res.status(401).send({ error: "User not authenticated or missing token." });

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.

    jwt.verify(token, PRIVATE_KEY, function(error, credentials){ //Validar token
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" }); //Token OK
        req.user = credentials.user;
        console.log("req.user", req.user);
        next();
    })
};


export { __dirname, createHash, validateHash, generateJWToken, authToken, PRIVATE_KEY };