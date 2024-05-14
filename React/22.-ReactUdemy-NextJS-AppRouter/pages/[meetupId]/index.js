import { mongodb } from "../mongo.js";
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { ObjectId } from "mongodb";
import Head from "next/head.js";

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail values={props.meetupData} />;
        </>
    )
};

export async function getStaticPaths() {
    const { client, meetupsCollection } = await mongodb();
    const meetups = await meetupsCollection.find({}).project({ _id: 1 }).toArray(); //{_id: 1} means only include the id but no other field values
    client.close();

    return {
        fallback: "blocking",
        paths: meetups.map(function (event) {
            return {
                params: { meetupId: event._id.toString() }
            }
        })
    };
}

export async function getStaticProps(context) {
    const { meetupId } = context.params;
    const { client, meetupsCollection } = await mongodb();
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: { id: selectedMeetup._id.toString(), image: selectedMeetup.image, title: selectedMeetup.title, address: selectedMeetup.address, description: selectedMeetup.description }
        }
    };
};

export default MeetupDetails;

// getStaticPaths
// If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
// When you export a function called getStaticPaths(Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre - render all the paths specified by getStaticPaths.