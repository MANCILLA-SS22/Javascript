import { MONGO_URL } from "../dotenvMain/env.config.js";
import mongoose from "mongoose";

function mongoConfig(){
    async function connectMongo(){
        try {
            console.log("DB connected")
            await mongoose.connect(MONGO_URL)
        } catch (error) {
            console.log(error);
            process.exit();
        }
    }
    connectMongo();    
}

export default mongoConfig;