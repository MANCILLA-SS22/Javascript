import multer from "multer";
import { __dirname } from "../dirname.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("file", file)
        cb(null,`${__dirname}/../src/public/images`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({
    storage: storage,
    onError: function (err, next) {
        console.log(err);
        next();
    }
});

export {uploader};