import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {type: String, unique: true}, //Debe autogenerarse y ser único
    purchase_datetime: String,          //Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
    amount: Number,                     //total de la compra
    purchaser: String                   //contendrá el correo del usuario asociado al carrito.
});

const ticketModel = model("tickets", ticketSchema);
export {ticketModel};