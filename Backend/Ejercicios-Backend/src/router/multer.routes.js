import { Router } from "express";
import { loader } from "../utils/multer.js";
const router = Router();

router.post("/", loader.single("file"), function(request, response){
    if(!request.file){
        return response.status(500).json({error: "Hubo un error al subir el archivo"});
    }else{
        return response.json({message: "El archivo se subio correctamente"});
    }
});

export default router;