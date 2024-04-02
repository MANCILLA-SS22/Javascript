import { transporter } from "../../utils/nodeMailer.js";
import { EMAIL_USER } from "../dotenvMain/env.config.js";

async function sendNotification(email, mensaje){

    try {
        const mailOptionsToReset = {
            from: EMAIL_USER,
            to: email,
            subject: mensaje.subject,
            html: mensaje.message
        }

        await transporter.sendMail(mailOptionsToReset);
        return "Mensaje enviado";
    } catch (error) {
        throw error;
    }
}

export {sendNotification};