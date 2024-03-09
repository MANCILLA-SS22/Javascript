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
    role: {type: String, default: 'USER', enum: ['USER', 'ADMIN', "PREMIUM"]}
});


const userModel = model("users", userSchema);
export {userModel};