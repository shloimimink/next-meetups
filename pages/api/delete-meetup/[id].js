import {MongoClient, ObjectId} from "mongodb";

async function handler(req, res) {
    if (req.method === "DELETE") {
        console.log(req.query)
        const data = req.query.id

        const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI)
        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        await meetupsCollection.deleteOne({_id: ObjectId(data)});

        res.status(200).json({message: "Meetup deleted successfully"});
        client.close();
    }
}

export default handler