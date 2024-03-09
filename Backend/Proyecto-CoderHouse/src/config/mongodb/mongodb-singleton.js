import mongoose from "mongoose";
import { MONGO_URL } from "../dotenvMain/env.config.js";

class MongoSingleton {
    static #instance; //Decimos que es un metodo privado porque no queremos que no sea accesible desde afuera. Es decir, que sea solo ejecutado por la clase principal y no por las clases heredadas

    constructor() {
        this.#connectMongoDB("Conectado con exito a MongoDB usando Moongose."); 
    };

    // Implementacon Singleton
    static getInstance() {
        this.#instance ? console.log("Ya se ha abierto una conexion a MongoDB.") : this.#instance = new MongoSingleton();
        return this.#instance; //Retorna la instancia creada del objeto, en el cual, dentro del constructor se iniciliza (y ejecuta) la funcion "#connectMongoDB", la cual permitira que haga la coneccion con mongodb.
    }

    async #connectMongoDB(message){
        try {
            await mongoose.connect(MONGO_URL);
            console.log(message);
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
};

export {MongoSingleton};