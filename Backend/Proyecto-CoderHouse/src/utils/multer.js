import multer from "multer";
import fs from "fs";
import { __dirname } from "../dirname.js";

const storage = multer.diskStorage({
    destination: async function(req, file, cb){

        const destination = {
            profile: "profiles",
            product: "products",
            document: "documents",
            comprobanteDeDomicilio: "comprobanteDeDomicilio",
            comprobanteDeCuenta: "comprobanteDeCuenta"
        }
        
        const folderLocation = destination[file.fieldname];
        // console.log("folderLocation", folderLocation);
        const {email} = req.user;
        const path = `${process.cwd()}/src/files/${folderLocation}/`;

        if(!fs.existsSync(path)) fs.mkdirSync(path);
        if(!fs.existsSync(`${path}/${email}`)) fs.mkdirSync(`${path}/${email}`);

        cb(null,`${path}/${email}`);
    },
    filename: function(req, file, cb){
        // cb(null, `${Date.now()}-${file.originalname.split(".")[1]}`);
        cb(null, `${Date.now()}-${file.originalname}`);

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