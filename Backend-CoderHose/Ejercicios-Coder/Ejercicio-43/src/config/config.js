import dotenv from 'dotenv';
import program from './process.js';

const environment = program.opts().mode;
dotenv.config({ path: environment === "prod" ? "./Ejercicio-43/src/config/.env.production" : "./Ejercicio-43/src/config/.env.development" });


// console.log(process);
// console.log(process.argv); // npm run start
// console.log(process.argv.slice(2)); // --> ["hello", "world"]

const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    mode: environment,
    runTests: program.opts().test,

    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioSmsNumber: process.env.TWILIO_SMS_NUMBER,
    twilioToSmsNumber: process.env.TWILIO_TO_SMS_NUMBER,
    twilioWhatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,
    twilioToWhatsappNumber: process.env.TWILIO_TO_WHATSAPP_NUMBER
};

// console.log("config: ", config);

export default config;