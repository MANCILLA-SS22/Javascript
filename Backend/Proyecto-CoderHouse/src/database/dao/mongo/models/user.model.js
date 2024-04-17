import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, index: true, require: true },
    last_name: String,
    email: { type: String, require: true, unique: true },
    age: Number,
    password: String,
    cart: [
        {
            type: Schema.Types.ObjectId, 
            ref: "carts"
        }
    ],
    role: {type: String, default: 'USER', enum: ['USER', 'ADMIN', "PREMIUM"]}, //PREMIUM estará habilitado para crear productos
    documents: [{
        name: String,
        reference: String
    }], //Debe contener los objetos con las siguientes propiedades: name: String (Nombre del documento), reference: String (link al documento).
    last_connection: {type: String, required: true} //deberá modificarse cada vez que el usuario realice un proceso de login y logout
});


const userModel = model("users", userSchema);
export {userModel};