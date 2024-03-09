import program from "../../process.js";
import dotenv from "dotenv";
dotenv.config({path: "./Entregas/TerceraEntrega/src/config.env"}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const COOKIE_CODE = process.env.COOKIE_CODE
const SECRETKEY = process.env.SECRETKEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECRET_KEY = process.env.SECRETKEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
const clientID_github = process.env.clientID_github;
const clientSecret_github = process.env.clientSecret_github
const PERSISTENCE = program.opts().persist;


export { MONGO_URL, PORT, COOKIE_CODE, SECRETKEY, PRIVATE_KEY, SECRET_KEY, EXPIRES_IN, clientID_github, clientSecret_github, PERSISTENCE}