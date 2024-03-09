import { Router } from "express";

const router = Router();

router.get("/setcookie", function(req, res){
    res.cookie("CooderCookie", "Esta es una cookie sin firma!!", {maxAge: 30000}).send("Cookie asignada con exito")
});

router.get("/getcookie", function(req, res){
    res.send(req.cookies);
});

export default router;