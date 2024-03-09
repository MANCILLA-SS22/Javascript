import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    loggedBy: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', "premium"],
    }
});


const userModel = model("users", userSchema);
export { userModel };