import nodemailer from 'nodemailer';
import config from '../config/config.js';
import {__dirname} from '../dirname.js'

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
    if(error){
        console.log(error);
    }else{
        // console.log("Server is ready to take our messages");
    }
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

export {sendEmail, sendEmailWithAttachments};