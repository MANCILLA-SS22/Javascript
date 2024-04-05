import { Router } from 'express';
import passport from 'passport';
import { authToken } from '../utils/jwt.js';
import { passportCall, authorization } from '../utils/passport.js';
import { userModel } from '../database/dao/mongo/models/users.model.js';

const router = Router();

// (COMENTAR TODOS LOS METODOS MENOS EL QUE SE VA A UTILIZAR)

//Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
router.get("/", authToken, function(req, res){
    res.render('profile', {user: req.user});
});

//Metodo 2: Usando JWT por Cookie
// router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){  //Colocamos session:false debido a que no necesitamos express-session para estos procesos.
//     res.render('profile', {user: req.user});
// });

//Metodo 3: Usando passport-JWT por Cookie mediante customCall, y middleware de autorización
// router.get("/", passportCall('jwt'), authorization('admin'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });

//Metodo 4: Usando middleware de autorización
// router.get("/", authorization('admin'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });

//Metodo 5: Usando Authorization Bearer Token
// router.get("/", function(req, res){
//     res.render('profile', {user: req.user});
// });
// router.get("/:userId", authToken, async function(req, res){
//     const userId = req.params.userId;  console.log("URL id", userId);
//     try {
//         const user = await userModel.findById(userId);    
//         console.log("User", user);
//         if (!user) res.status(202).json({message: "User not found with ID: " + userId});
//         res.json(user);
//     } catch (error) {
//         console.error("Error consultando el usuario con ID: " + userId);
//     }
// });

router.get("/login", function(req, res){
    res.render('loginJwt')
});

router.get("/register", function(req, res){
    res.render('registerJwt')
});

router.get("/error", function(req, res){
    res.render("error");
});

export default router;