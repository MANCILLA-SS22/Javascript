import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority"

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect(MONGO_URL);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
export {connectMongo};