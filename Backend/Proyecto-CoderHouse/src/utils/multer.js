import multer from "multer";
import fs from "fs";
import { __dirname } from "../dirname.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb){

        const destination = {
            profile: "profiles",
            product: "products",
            document: "documents",
            comprobanteDeDomicilio: "documents",
            comprobanteDeCuenta: "documents"
        }

        const folderLocation = destination[file.fieldname];
        const {email} = req.user;
        const path = `${process.cwd()}/src/files/${folderLocation}`;

        if(!fs.existsSync(path)) fs.mkdirSync(path);
        if(!fs.existsSync(`${path}/${email}`)) fs.mkdirSync(`${path}/${email}`);

        cb(null,`${path}/${email}`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname.split(".")[1]}`);
    }
}); 

const uploader = multer({
    storage,
    onError: function (err, next) {
        console.log(err);
        next();
    }
});

export {uploader};