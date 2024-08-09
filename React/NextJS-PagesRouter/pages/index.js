import Head from 'next/head.js';
import MeetupList from '../components/meetups/MeetupList';
import { mongodb } from "./mongo.js";

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

//getStaticProps()
//When using Static Generation, a page component is pre-rendered when you build your application, when you build the next project. So when you build it for production.
//With Static Generation, by default, your page is not pre-rendered on the fly on the server when a request reaches the server but instead, it is pre-rendered when you as a developer build your site
//for production. And that means that after it was deployed, that pre-rendered page does not change. At least not by default.
//Remember that NextJS prepares your pages. It by default generates your pages already statically and it by default does that during the build process but if you need to wait for data, if you need
//to add data fetching to a page component, you can do so by exporting the following function:
//"getStaticProps" is a reserved name so to say. NextJS will look for a function with that name and if it finds it, it executes this function during this pre-rendering process.
//So it will then not directly call your component function and use the returned JSX snapshot as HTML content but it will, first of all, call getStaticProps before it calls the component function.
//We use "async" in "getStaticProps" because NextJS will wait for this promise to resolve, which means it waits until your data is loaded and then you return the props for this component function.
//And with that, you're able to load data before this component function is executed so that this component can be rendered with the required data.
//Now, in "getStaticProps", you can also execute any code that would normally only run on a server. You could access a file system here or securely connect to a database because any code you write
//in here will never end up on the client side and it will never execute on the client side simply because this code is executed during the build process, not on the server and especially not on the
//clients of your visitors. So the code in here will never reach the machines of your visitors. It will never execute on their machines.
//(This now only works in your page component files, not in other component files. Only in component files inside of the pages folder).

//getServerSideProps()
//It is a function that can be used to fetch data and render the contents of a page at request time. You should use getServerSideProps if you need to render a page that relies on personalized user data,
//or information that can only be known at request time. For example, authorization headers or a geolocation. If you do not need to fetch the data at request time, or would prefer to cache the data and
//pre-rendered HTML, we recommend using getStaticProps.

//The difference to getStaticProps is that this function will now not run during the build process, but instead always on the server after deployment or for every request.
//Any code we write in getServerSideProps will always run on the server, never in the client.
//It's important to note that the data could be outdated. And this page is generated during the build process. So thereafter we deploy it. If we then add more "meetups" to our database this pre-generated
//page wouldn't knmow about them. And if we don't add any client-side data fetching we would always see the oudated meetups in the app.
//The disadvantage of using this is that we need to wait for our page to be generated on every incoming request. Now if we don't have data that changes all the time (Like when it changes multiple times
//every second), getStaticProps is a better choice.

//revalidate:
//This stands for the number of seconds NextJS will wait until it regenerates the page for an uncoming request. That means that with revalidate set to some number, this page won't just be regenerated
//during the build process, it'll be generated there but not just, but it'll also be generated every couple of seconds on the server, at least if there are requests. Then these regenerated pages
//would repalce the old pre-generated pages. And with that you would ensure that your data is never older than 10 seconds.