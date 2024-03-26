import { Schema, model } from "mongoose";

const schema = new Schema({
    name: { type: String, index: true },
    type: String,
    isAdopted: Boolean,
});

schema.index({name: 1, type: 1}, { unique: true, dropDups: true })
const petsModel = model('pets', schema);

export {petsModel};