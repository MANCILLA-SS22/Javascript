import dotenv from 'dotenv';
import { __dirname } from '../utils.js';
// import path from 'path';
import program from "../process.js"

// dotenv.config({ path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`) });

const environment = program.opts().mode;
dotenv.config({ path: environment === "prod" ? "./Ejercicio-46/backend/production.env" : `${__dirname}/development.env` });

const obj = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA,
    MONGO_URL: process.env.MONGO_URL
}

export default obj;