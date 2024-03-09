import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});

const modelChat = mongoose.model("chat", chatSchema);

export {modelChat};