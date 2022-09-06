import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

export default function NewMeetupPage() {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Add a new Meetup</title>
                <meta
                    name='description'
                    content='Add or browse for your favorite tourist attractions'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>

    )
}