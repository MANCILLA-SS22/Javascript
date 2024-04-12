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

        cb(null,`${__dirname}/../public/img`);
    },
    filename: function(req, file, cb){
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