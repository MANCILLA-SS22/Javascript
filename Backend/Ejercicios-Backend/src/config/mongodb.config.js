import mongoose from "mongoose";
import {port, mongoUrl} from "./config.js"

async function connectMongo(app){
    try {
        const server = app.listen(port, console.log("Server listening on port " + port));
        console.log("DB connected")
        await mongoose.connect(mongoUrl);
        server.on('error', error => console.log('Servidor express con error', error));
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
export {connectMongo};