import { COOKIE_CODE } from "../dotenvMain/env.config.js";
import { __dirname } from "../../utils.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

function middlewares(app, express){
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
    app.use(cookieParser(COOKIE_CODE)); //colocamos la inicialización de nuestro passport, la inicialización de passport y cookieParser también para que el servidor pueda reconocer correctamente las cookies. 
}

export default middlewares;