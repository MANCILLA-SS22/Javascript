import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema({
    name:{
        type:String,
        required:true,
    },
    specie:{
        type:String,
        required:true
    },
    birthDate:Date,
    adopted:{
        type:Boolean,
        default:false
    },
    owner:{
        type:SchemaTypes.ObjectId,
        ref:'Usuario'
    },
    image:String
})

const mascotaModel = model("Mascotas", schema);

export {mascotaModel};