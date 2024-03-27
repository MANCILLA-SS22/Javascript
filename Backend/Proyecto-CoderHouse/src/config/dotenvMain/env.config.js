import program from "./process.js";
import dotenv from "dotenv";

const environment = program.opts().mode;
dotenv.config({ path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development" }); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables

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
const SERVICE = process.env.SERVICE;
const PORT_NODEMAILER = process.env.PORT_NODEMAILER;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export { MONGO_URL, PORT, COOKIE_CODE, SECRETKEY, PRIVATE_KEY, SECRET_KEY, EXPIRES_IN, clientID_github, clientSecret_github, PERSISTENCE, environment, SERVICE,PORT_NODEMAILER, EMAIL_USER, EMAIL_PASSWORD }