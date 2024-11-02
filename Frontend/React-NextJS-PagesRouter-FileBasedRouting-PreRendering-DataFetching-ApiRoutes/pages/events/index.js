import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-utils'; 
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import Head from 'next/head';

function AllEventsPage({events}) {
    const router = useRouter();

    function findEventsHandler(year, month) {
        router.push(`/events/${year}/${month}`);
    }

    return <>
        <Head>
            <title>All Events</title>
            <meta name='description' content='Fund a lot of great evebts that allow you to envolve...' />
        </Head>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={events} />
    </>
}

export async function getStaticProps() {
    const events = await getAllEvents();
    return { 
        props: { events: events}, 
        revalidate: 60
    }
}

export default AllEventsPage;
