import { Router } from "express";
import path from "path";
import { __dirname } from "../dirname.js";

const router = Router();

router.get('^/$|/index(.html)?', function(req, res){
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;