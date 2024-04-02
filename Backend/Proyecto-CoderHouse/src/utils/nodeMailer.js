import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER, PORT_NODEMAILER, SERVICE } from '../config/dotenvMain/env.config.js';

const transporter = nodemailer.createTransport({
    service: SERVICE,
    port: PORT_NODEMAILER,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    },
});

export {transporter}