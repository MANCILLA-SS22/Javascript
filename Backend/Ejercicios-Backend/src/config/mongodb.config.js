import mongoose from "mongoose";
import {port, mongoUrl} from "./config.js"

async function connectMongo(app){
    try {
        app.listen(port, console.log("Server listening on port " + port));
        console.log("DB connected")
        await mongoose.connect(mongoUrl);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
export {connectMongo};