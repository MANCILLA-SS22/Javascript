import nodemailer from "nodemailer";
import pug from "pug";
import {htmlToText} from "html-to-text";
import { __dirname } from "../dirname.js";

class Email{
    constructor(user, url){ //This constructor function is the one that is gonna be running when a new object is created through this class
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `German Mancilla <${process.env.EMAIL_FROM}>`
    };

    async sendWelcome(){
        await this.send("welcome", "Welcome to the Natours Family!");
    }    

    async send(template, subject){ //Send the actual email
        const html = pug.renderFile(`${__dirname}/views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject: subject
        })

        const mailOptions = { // 1) We need to define email options and the email address where we want to send an email to, the subject line, the email content, etc.
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: htmlToText(html)
        };

        this.newTransport();
        await this.newTransport().sendMail(mailOptions); //This always returns a promise 
    }

    newTransport(){
        if(process.env.NODE_ENV === "production"){
            return nodemailer.createTransport({
                service: 'SendinBlue',
                auth: {
                    user: process.env.USER_BREVO,
                    pass: process.env.PASSWORD_BREVO
                }
            });
        };
        
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            logger: true,        
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });        
    };

    async sendPasswordReset(){
        await this.send("passwordReset", "Your password reset token (valid for only 10 minutes")
    }
}

export {Email}

// Enter here ---> https://mailtrap.io/inboxes/2590364/messages/4016727448