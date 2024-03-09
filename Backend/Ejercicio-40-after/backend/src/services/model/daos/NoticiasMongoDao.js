import { MongoClient, ObjectId } from "mongodb";
import obj from "../../../configs/configs.js"

class NoticiasMongoDao {

    constructor(database, collection) {
        (async () => {
            console.log('Conectando a la base de datos...');
            const connection = await MongoClient.connect(obj.MONGO_URL, {});

            const db = connection.db(database);
            this._collection = db.collection(collection);
            console.log('Base de datos conectada');
        })()
    }

    async obtenerNoticias (_id){
        const noticia = await this._collection.findOne({ _id: ObjectId(_id) });
        return [noticia];
    }

    async guardarNoticia (noticia){
        await this._collection.insertOne(noticia);
        return noticia;
    }

    async actualizarNoticia (_id, noticia){
        await this._collection.updateOne({ _id: ObjectId(_id) }, { $set: noticia });
        return [noticia];
    }

    async borrarNoticia (_id){
        await this._collection.deleteOne({ _id: ObjectId(_id) });
    }
}

export default NoticiasMongoDao;