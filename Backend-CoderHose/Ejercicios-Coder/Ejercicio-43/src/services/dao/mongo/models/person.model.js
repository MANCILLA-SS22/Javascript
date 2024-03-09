import { Schema, model } from "mongoose";

const personSchema = new Schema({
    first_name: {
        type: String,
        index: true,
    },
    last_name: String,
    email: String,
    gender: String,
});

personSchema.index({ first_name: -1, last_name: 1 }); //Compound indexes (compound): Se utiliza cuando requerimos utilizar más de una indexación y queremos definir el orden con el cual se realiza el ordenamiento (ordenando con 1 para ascendente y -1 para descendente, igual que un sort: { campo: 1 , campo: -1 } 
personSchema.index({ first_name: "text", email: "text" }); //Text Indexes (text): Se utiliza para poder basarse en búsquedas de palabras “específicas” con el fin de poder tomar referencia de un texto a partir de dichas palabras

const personModel = model("persons", personSchema);
export { personModel };