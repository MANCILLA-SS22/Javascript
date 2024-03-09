import {UserService} from "../services/dao/mongo/users.service.js"
import {createHash, validateHash} from '../dirname.js';

const userServiceDao = new UserService();

async function loginUser(req, res) {
    const {email, password} = req.body;
    try {
        const user = await userServiceDao.findByUsername(email);
        console.log("Usuario encontrado para login: ", user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(204).send({error: "Not found", message: "Usuario no encontrado con username: " + email});
        }
        if (!validateHash(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"});
        }
        const tokenUser= {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        //const access_token = generateJWToken(tokenUser); //No tokens for now.
        //console.log(access_token);
        //Con Cookie
        /*res.cookie('jwtCookieToken', access_token, {  //No cookies for now.
            maxAge: 60000,
            httpOnly: true
        });*/
        res.send({message: "Login successful!", payload: tokenUser});
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
};

async function registerUser (req, res) {
    const { first_name, last_name, email, age, password} = req.body;
    console.log("req.body: ", req.body);

    const exists = await userServiceDao.findByUsername(email);
    if (exists) return res.status(400).send({status: "error", message: "Usuario ya existe."});
    
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    };

    console.log("User --> ", user)
    const result = await userServiceDao.save(user);
    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
};

export {loginUser, registerUser}