import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        default:'user'
    },
    pets:{
        type:[
            {
                _id:{
                    type: SchemaTypes.ObjectId,
                    ref:'Mascotas'
                }
            }
        ],
        default:[]
    }
})

const usuarioModel = model("Usuario", schema);

export {usuarioModel};