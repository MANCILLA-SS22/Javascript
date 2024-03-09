import config from "../config/config.js";
import twilio from 'twilio';

const twlioClient = twilio(config.twilioAccountSID, config.twilioAuthToken);
const twilioSMSoptions = {
    body: "Este es un mensaje SMS de prueba usando twilio desde CoderHouse!!",
    from: config.twilioSmsNumber,
    to: config.twilioToSmsNumber
};

async function sendSMS(req, res){
    try {
        console.log("Enviando SMS usando Twilio: ", twlioClient);
        const result = await twlioClient.messages.create(twilioSMSoptions);

        res.send({message: "success", payload: result})
    } catch (error) {
        res.status(500).send({error: error})
    }
}

export {sendSMS}