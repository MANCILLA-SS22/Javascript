import { Schema, model } from "mongoose";

const schema = new Schema({
    name: String,
    type: String,
    isAdopted: Boolean
});

const petsModel = model('pets' ,schema);

export {petsModel};