import multer from "multer";
import { __dirname } from "../dirname.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,`${__dirname}/../public/img`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const loader = multer({
    storage,
    onError: function (err, next) {
        console.log(err);
        next();
    }
});

export {loader};