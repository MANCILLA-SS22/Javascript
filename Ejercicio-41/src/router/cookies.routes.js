import { Router } from "express";
import coockieParser from "cookie-parser";

const router = Router();

//Con firma
router.use(coockieParser("coder1234"));

router.get("/", function(req, res){
    res.render("cookiesIndex", {})
});

router.get("/setcookie", function(req, res){
    res.cookie("cooderCookie", "Esta es una cookie con firma!!", {maxAge: 30000, signed: true}).send("Cookie asignada con exito")
});

router.get("/getcookie", function(req, res){
    res.send(req.signedCookies);
});

router.get("/deletecookie", function(req, res){
    res.clearCookie("cooderCookie").send("Cookie borrada!!");
});

//2da parte
router.get("/session", function(req, res){
    if(req.session.counter){
        req.session.counter++;
        res.send(`Usted ha visitado el sitio: ${req.session.counter} veces!`);
    }else{
        req.session.counter = 1;
        res.send("Bienvenido!");
    }
});

router.get("/logout", function(req, res){
    req.session.destroy(function(error){
        if(error){
            res.json({error: "Error logout", msg: "Error al cerrar la sesion"});
        }
        res.send("Sesion cerrada correctamente");
    })
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




/* //Sin firma
router.use(coockieParser());

router.get("/", function(req, res){
    res.render("cookiesIndex", {})
});

router.get("/setcookie", function(req, res){
    res.cookie("CooderCookie", "Esta es una cookie sin firma!!", {maxAge: 30000}).send("Cookie asignada con exito")
});

router.get("/getcookie", function(req, res){
    res.send(req.cookies);
});

router.get("/deletecookie", function(req, res){
    res.clearCookie("cooderCookie").send("Cookie borrada!!");
}); */