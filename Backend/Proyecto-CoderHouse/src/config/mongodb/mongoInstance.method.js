import {MongoSingleton} from "./mongodb-singleton.js"

async function configMongoSingleton(){
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}; 

export {configMongoSingleton};