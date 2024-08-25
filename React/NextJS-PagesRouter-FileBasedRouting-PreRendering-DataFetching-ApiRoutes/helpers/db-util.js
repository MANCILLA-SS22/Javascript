import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = new MongoClient('mongodb+srv://german_ss22:coder123@cluster0.pa5ok.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = await client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}){
    const db = await client.db();
    const documents = await db.collection(collection).find(filter).sort(sort).toArray();
    return documents;
}