import {useState} from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import {MongoClient} from 'mongodb'

export default function HomePage(props) {
    const [meetups, setMeetups] = useState(props.meetups)

    async function deleteHandler(data) {
        console.log(data)
        const response = await fetch(`/api/delete-meetup/${data}`, {
            method: 'DELETE',
        });
        await response.json({message: 'Meetup deleted'});
        setMeetups(meetups.filter((meetup) => meetup.id !== data))
    }

    return (
        <>
            <Head>
                <title>Tourists Meetups</title>
                <meta
                    name='description'
                    content='Add or browse for your favorite tourist attractions'
                />
            </Head>
            <MeetupList meetups={meetups} deleteHandler={deleteHandler}/>
        </>
    )
}

export async function getServerSideProps() {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    }
}