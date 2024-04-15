import { Router } from "express";
import { uploader } from "../utils/multer.js";
const router = Router();

router.post("/", uploader.single("MyFile"), function(req, res){
    console.log("req.file", req.file); 
    if(!req.file) return res.status(500).json({error: "Hubo un error al subir el archivo"}); 
    return res.json({message: "El archivo se subio correctamente"});
});

export default router;