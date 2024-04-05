import { Router } from 'express';

const router = Router();

router.get("/login", function(req, res){
    res.render('loginSession')
});

router.get("/register", function(req, res){
    res.render('registerSession')
});

router.get("/error", function(req, res){
    res.render("error");
});

router.get("/logout", function(req, res){
    req.session.destroy(function(error){
        if(error) res.json({error: "Error logout", msg: "Error al cerrar la sesion"});
        res.send("Sesion cerrada correctamente");
    })
});

router.get("/session", function(req, res){
    if(req.session.counter){
        req.session.counter++;
        res.send(`Usted ha visitado el sitio: ${req.session.counter} veces!`);
    }else{
        req.session.counter = 1;
        res.send("Bienvenido!");
    }
});

router.get("/login", function(req, res){
    const {username, password} = req.query;
    if(username !== "german" || password !== "ss22"){
        return res.status(401).send("Login failed, check your credentials");
    }else{
        req.session.user = username;
        req.session.admin = true;
        res.send("Login Successful!");
    }
});

router.get("/private", auth, function(req, res){
    res.send("Si estas viendo es porque estas autorizado a este recurso!")
});


function auth(req, res, next){
    if(req.session.user === "german" && req.session.admin){
        return next();
    }else{
        return res.status(403).send("Usuario no esta autorizado!");
    }
}

export default router;