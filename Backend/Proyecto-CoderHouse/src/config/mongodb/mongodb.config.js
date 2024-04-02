import {MongoSingleton} from "./mongodb-singleton.js"

function mongoConfig(){
    async function connectMongo(){
        try {
            await MongoSingleton.getInstance();
        } catch (error) {
            console.log(error);
            process.exit();
        }
    }
    connectMongo();    
}

export default mongoConfig;