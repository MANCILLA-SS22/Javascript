import jwt from 'jsonwebtoken';

const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT"; //Esta sirve para utilizarse al momento de hacer el cifrado del token  --> https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it

//JSON Web Tokens JWT --> Generate token JWT usando jwt.sign: Primer argumento: objeto a cifrar dentro del JWT Segundo argumento: La llave privada a firmar el token. Tercer argumento: Tiempo de expiración del token.
function generateJWToken(user){ 
     // Generate token JWT usando jwt.sign
     // Primer argumento: objeto a cifrar dentro del JWT
     // Segundo argumento: La llave privada a firmar el token.
     // Tercer argumento: Tiempo de expiración del token.
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

export {generateJWToken, authToken, PRIVATE_KEY}