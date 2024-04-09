import { Router } from "express";
import cookieParser from 'cookie-parser';

const router = Router();

//Con firma
//router.use(cookieParser());
router.use(cookieParser("coder1234"));

router.get("/", function(req, res){
    res.render("cookiesIndex", {});
});

router.get("/setcookie", function(req, res){
    const cookieObj = {
        maxAge: 5000, 
        expires: new Date().getTime() + (1 * 3600 * 1000),
        httpOnly: true,
        secure: true,
        signed: true,
        domain: "local:host",
        sameSite: "lax"
    }
    res.cookie("cooderCookie", "Esta es una cookie con firma!!", cookieObj).send("Cookie asignada con exito")
});

router.get("/getcookie", function(req, res){
    res.send(req.signedCookies);
});

router.get("/deletecookie", function(req, res){
    res.clearCookie("cooderCookie").send("Cookie borrada!!");
});

export default router;

/* //Sin firma
router.use(cookieParser());

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
