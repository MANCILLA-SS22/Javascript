import mongoose from "mongoose";
import config from "./config.js";

// Singleton nos ayuda a que la base de datos NO se ejecute mas de 1 vez. Si lo intentmaos, obtendremos un mensaje de error.

class MongoSingleton {
    static #instance; //Decimos que es un metodo privado porque no queremos que no sea accesible desde afuera. Es decir, que sea solo ejecutado por la clase principal y no por las clases heredadas

    constructor() {
        this.#connectMongoDB("Conectado con exito a MongoDB usando Moongose."); 
    };

    // Implementacon Singleton
    static getInstance(){
        this.#instance ? console.log("Ya se ha abierto una conexion a MongoDB.") : this.#instance = new MongoSingleton();
        return this.#instance; //Retorna la instancia creada del objeto, en el cual, dentro del constructor se iniciliza (y ejecuta) la funcion "#connectMongoDB", la cual permitira que haga la coneccion con mongodb.
    }

    #connectMongoDB(message){
        try {
            mongoose.connect(config.mongoUrl, {});
            console.log(message);
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
};

export default MongoSingleton;

//Pasos
// 1) Primero se manda a llamar la funcion getInstance desde el archivo "mongoInstance"
// 2) La funcion revisa si la variable "this.#instance" tiene algo almacenado. Si no existe nada, entocnes se crea una instancia del a clase misma "MongoSingleton"
// 3) Una creada una instancia y almacenada en dicha variable, se inicializa el constructor (recordar que al crear una instancia de una clase, el constructor es el primero en ejectutar lo que tiene adentro)
// 4) Finalmente, dentro del contructor se manada a llamar la funcion privada "connectMongoDB" en donde ahi mismo se inicializara la coneccion con mongoose.