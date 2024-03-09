import { Router } from "express";

const router = Router();

router.get("/login", function(req, res){
    res.render("github-login");
});

router.get("/error", function(req, res){
    res.render("error", { error: "No se pudo autenticar usando GitHub!" });
});

export default router;