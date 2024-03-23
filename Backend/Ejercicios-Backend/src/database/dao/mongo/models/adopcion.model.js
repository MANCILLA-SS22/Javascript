import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema({
    owner:{
        type:SchemaTypes.ObjectId,
        ref:'Usuario'
    },
    pet:{
        type:SchemaTypes.ObjectId,
        ref:'Mascotas'
    }
})

const adopcionModel = model("Adopciones", schema);

export {adopcionModel};