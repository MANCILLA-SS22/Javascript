import dotenv from 'dotenv';
import program from './program.js';
import { processFunc } from './process.js';

const environment = program.opts().mode;
dotenv.config({ path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development" });

const test = program.opts().test;
dotenv.config({ path: "./src/config/.env.development" });

const port = process.env.PORT || 9090;
const mongoUrl = test === true ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;
const mongoUrlTest = process.env.MONGO_URL_TEST;
const persistence = program.opts().persist;
const mode = environment;
const adminName = process.env.ADMIN_NAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const tipo_persistencia = process.env.TIPO_PERSISTENCIA;
const privateKey = process.env.PRIVATE_KEY;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackUrl = process.env.CALLBACK_URL;
const gmailAccount = process.env.GMAIL_ACCOUNT;
const gmailAppPassword = process.env.GMAIL_APP_PASSWD;
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSmsNumber = process.env.TWILIO_SMS_NUMBER;
const twilioToSmsNumber = process.env.TWILIO_TO_SMS_NUMBER;
const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const twilioToWhatsappNumber = process.env.TWILIO_TO_WHATSAPP_NUMBER;
const stripPublictKey = process.env.STRIPE_APP_PUBLICT_KEY;
const stripSecretKey = process.env.STRIPE_APP_SECRET_KEY;

processFunc(); // ****** Uso de listeners ******

export {
    port,
    mongoUrl,
    mongoUrlTest,
    test,
    persistence,
    mode,
    adminName,
    adminPassword,
    tipo_persistencia,
    privateKey,
    clientID,
    clientSecret,
    callbackUrl,
    gmailAccount,
    gmailAppPassword,
    twilioAccountSID,
    twilioAuthToken,
    twilioSmsNumber,
    twilioToSmsNumber,
    twilioWhatsappNumber,
    twilioToWhatsappNumber,
    stripPublictKey,
    stripSecretKey
};