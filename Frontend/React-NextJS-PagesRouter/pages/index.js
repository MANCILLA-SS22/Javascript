import Head from 'next/head.js';
import MeetupList from '../components/meetups/MeetupList';
import { mongodb } from "../lib/mongo.js";

function HomePage(props) {
    return <>
        <Head>
            <title>React Meetups</title>
            <meta name='description' content='Browse a huge list of highly active React meetups!' />
        </Head>
        <MeetupList values={props.meetups} />;
    </>
}

// export async function getServerSideProps(context) {
//     const {req, res} = context;
//     return {
//         props: { meetups: DUMMY_MEETUPS }
//     };
// }

export async function getStaticProps() {
    const { client, meetupsCollection } = await mongodb();
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(function (meetup) {
                return { title: meetup.title, address: meetup.address, image: meetup.image, id: meetup._id.toString() }
            })
        },
        revalidate: 1
    };
}

export default HomePage;

//revalidate:
//This stands for the number of seconds NextJS will wait until it regenerates the page for an uncoming request. That means that with revalidate set to some number, this page won't just be regenerated
//during the build process, it'll be generated there but not just, but it'll also be generated every couple of seconds on the server, at least if there are requests. Then these regenerated pages
//would repalce the old pre-generated pages. And with that you would ensure that your data is never older than 10 seconds.