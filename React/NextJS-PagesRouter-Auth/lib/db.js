import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = new MongoClient('mongodb+srv://german_ss22:coder123@cluster0.pa5ok.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0');
    return await client.connect();
};