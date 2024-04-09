import {twilioAccountSID, twilioAuthToken, twilioWhatsappNumber, twilioToWhatsappNumber} from "../config/config.js";
import twilio from 'twilio';

const twlioClient = twilio(twilioAccountSID, twilioAuthToken);

const twilioWHATSAPPoptions = {
    body: "Este es un mensaje SMS de prueba usando twilio desde CoderHouse!!",
    from: twilioWhatsappNumber,
    to: twilioToWhatsappNumber
};

async function sendWhatsapp(req, res){
    try {
        console.log("Enviando WHATSAPP usando Twilio: ", twlioClient);
        const result = await twlioClient.messages.create(twilioWHATSAPPoptions);
        res.send({message: "success", payload: result})
    } catch (error) {
        res.status(500).send({error: error})
    }
}

export {sendWhatsapp}