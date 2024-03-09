import MongoSingleton from "../config/mongodb-singleton.js";

async function mongoInstance(){
    try {
        await MongoSingleton.getInstance(); //Con mongo singleton podemos evitar el instanciar mas de una vez la conexion a una base de datos
    } catch (error) {
        console.log(error);
    }
}

export {mongoInstance};