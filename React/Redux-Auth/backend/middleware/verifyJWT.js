import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
        if (err) return res.sendStatus(403); //invalid token
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
}

export default verifyJWT;