import { mongodb } from "../mongo.js";

async function handler(req, res){
    if(req.method !== "POST") return;

    const data = req.body;
    const { client, meetupsCollection } = await mongodb();
    await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' })
}

export default handler;