import mongodb from 'mongodb';
import { mongoUrl } from '../../../../config/config.js';

const { MongoClient, ObjectId } = mongodb;

class NoticiasMongoDao {
    constructor(database, collection) {
        // (async () => {
        //     console.log('Conectando a la base de datos...');
        //     const connection = await MongoClient.connect(mongoUrl, {});

        //     const db = connection.db(database);
        //     this._collection = db.collection(collection);
        //     console.log('Base de datos conectada');
        // })()
    }

    obtenerNoticias = async _id => {
        const noticia = await this._collection.findOne({ _id: ObjectId(_id) });
        return [noticia];
    }

    guardarNoticia = async noticia => {
        await this._collection.insertOne(noticia);
        return noticia;
    }

    actualizarNoticia = async (_id, noticia) => {
        await this._collection.updateOne({ _id: ObjectId(_id) }, { $set: noticia });
        return [noticia];
    }

    borrarNoticia = async _id => {
        await this._collection.deleteOne({ _id: ObjectId(_id) });
    }
}

export default NoticiasMongoDao;