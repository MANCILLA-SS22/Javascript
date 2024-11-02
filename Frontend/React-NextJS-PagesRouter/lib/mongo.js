import { MongoClient } from "mongodb";

export async function mongodb() {
    const client = await MongoClient.connect("mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/nextjs?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    return { client, meetupsCollection }
};