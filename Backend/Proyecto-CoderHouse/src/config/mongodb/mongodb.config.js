import mongoose from "mongoose";
import { PORT, MONGO_URL } from "../dotenvMain/env.config.js";

async function configMongo(httpServer){
    try {
        const server = httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
        console.log("DB connected")
        await mongoose.connect(MONGO_URL);
        server.on('error', error => console.log('Servidor express con error', error));
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
export {configMongo};