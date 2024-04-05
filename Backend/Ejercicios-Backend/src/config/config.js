import dotenv from 'dotenv';
import program from './program.js';
import { processFunc } from './process.js';

const environment = program.opts().mode;
dotenv.config({ path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development" });

const test = program.opts().test;
dotenv.config({ path: "./src/config/.env.development" });

const config = {
    port: process.env.PORT,
    mongoUrl: test === true ? process.env.MONGO_URL_TEST : process.env.MONGO_URL,
    mongoUrlTest: process.env.MONGO_URL_TEST,
    persistence: program.opts().persist,
    mode: environment,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioSmsNumber: process.env.TWILIO_SMS_NUMBER,
    twilioToSmsNumber: process.env.TWILIO_TO_SMS_NUMBER,
    twilioWhatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,
    twilioToWhatsappNumber: process.env.TWILIO_TO_WHATSAPP_NUMBER
};// console.log("config: ", config);

processFunc(); // ****** Uso de listeners ******

export default config;