import nodemailer from 'nodemailer';
import config from '../config/config.js';
import {__dirname} from '../dirname.js';
import { v4 } from 'uuid';

//Link para crear verificacion en dos pasos en google (2-Step verification)
//https://myaccount.google.com/security?rapt=AEjHL4NHiAg7dz1Oa3WNINWqadlcLoRgFKXYzA_ZMhOoZ_0q85aDj-zdsIuqOUiXDOYE-B0n4u9JXcALoXNnvJOLwHCvhRUCAgFFydKEGPcSf12iutsje90

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    },
});

transporter.verify(function(error, success){
    // error ? console.log(error) : console.log("Server is ready to take our messages");
});

const mailOptions = {
    from: "Coder Test - "+ config.gmailAccount,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHose Programacion Backend Clase_30",
    html: `
        <div>
            <h1>Esto es un test de correo con nodemailer</h1>
        </div>
    `,
    attachment: []
}

function sendEmail(req, res){
    try {
        let result = transporter.sendMail(mailOptions, function(error, info){
            if (error) res.status(400).send({message: "Error", payload: error});
            console.log("Message sent %s", info.messageId);
            res.send({message: "Success", payload: info});
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error, message: "No se pudo enviar el email"+ config.gmailAccount})
    }
}

const mailOptionsWithAttachemtns = {
    from: "Coder Test - "+ config.gmailAccount,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHose Programacion Backend Clase_30",
    html: `
        <div>
            <h1>Esto es un test de correo con nodemailer</h1>
            <p>Ahora usando imagenes: </p>
            <img src="cid:meme"/>
        </div>
    `,

    attachments: [
        {
            filename: 'Meme de programacion',
            path: __dirname + '/public/images/meme.png',
            cid: 'meme'
        }
    ]
}

function sendEmailWithAttachments(req, res){
    try {
        console.log(__dirname+"/public/images/meme.png")
        let result = transporter.sendMail(mailOptionsWithAttachemtns, function(error, info){
            if (error) res.status(400).send({message: "Error", payload: error});
            console.log("Message sent %s", info.messageId);
            res.send({message: "Success", payload: info});
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error, message: "No se pudo enviar el mensaje"+ config.gmailAccount})
    }
}

const mailOptionsToReset = {
    from: config.gmailAccount,
    to: config.gmailAccount,
    subject: "Reset password",
}

const tempDbMails = {}

function sendEmailToResetPassword(req, res){
    try {
        const { email } = req.body
        if (!email) return res.status(400).send('Email not privided');
        
        // Generamos un token/idrandom
        const token = v4();
        const link = `http://localhost:5500/api/email/reset-password/${token}`

        tempDbMails[token] = { // Esto es igual a --> tempDbMails.token
            email,
            expirationTime: new Date(Date.now() + 1*60*1000) //Esto representa una hora en milisegundos. Multiplicando 60 (segundos) por 60 (minutos) y luego por 1000 (milisegundos), obtenemos el equivalente a una hora en milisegundos.
        }
        console.log(tempDbMails);

        mailOptionsToReset.to = email
        mailOptionsToReset.html = `To reset your password, click on the following link: <a href="${link}"> Reset Password</a>`

        transporter.sendMail(mailOptionsToReset, function(error, info){
            if (error) res.status(500).send({ message: "Error", payload: error });
            console.log('Message sent: %s', info.messageId);
            res.send({ message: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}

function resetPassword(req, res){
    const {token} = req.params;
    const email = tempDbMails[token];
    console.log(email);

    const now = new Date();
    const expirationTime = email?.expirationTime
    console.log(expirationTime);

    if (now > expirationTime || !expirationTime) {
        delete tempDbMails[token]
        console.log('Expiration time completed');
        return res.redirect('/send-email-to-reset')
    }

    res.send('<h1>Start Reset Password Porcess</h1>')

}

export {sendEmail, sendEmailWithAttachments, sendEmailToResetPassword, resetPassword};