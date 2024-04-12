import { Router } from "express";
import { loader } from "../utils/multer.js";
const router = Router();

router.post("/", loader.single("file"), function(req, res){
    if(!req.file) return res.status(500).json({error: "Hubo un error al subir el archivo"}); 
    return res.json({message: "El archivo se subio correctamente"});
});

export default router;