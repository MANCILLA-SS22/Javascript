import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-utils'; 
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage({events}) {
    const router = useRouter();

    function findEventsHandler(year, month) {
        router.push(`/events/${year}/${month}`);
    }

    return <>
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
