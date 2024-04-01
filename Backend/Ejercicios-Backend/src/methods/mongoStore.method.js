import mongoose from "mongoose";

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect(MONGO_URL)
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
export {connectMongo};