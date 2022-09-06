import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb'
import Head from "next/head";

export default function MeetupDetailPage(props) {
    return (
        <>
            <Head>
                <title>Tourist single meetup</title>
                <meta
                    name='description'
                    content='Add or browse for your favorite tourist attractions'
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()
    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: {meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId

    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}