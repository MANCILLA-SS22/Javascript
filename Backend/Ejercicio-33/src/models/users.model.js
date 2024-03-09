import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
});

const userModel = model("users", userSchema);

export { userModel };