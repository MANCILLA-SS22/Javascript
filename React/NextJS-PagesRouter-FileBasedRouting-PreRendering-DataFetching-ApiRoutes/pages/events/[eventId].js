import Head from 'next/head';
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

function EventDetailPage(props) {
    const event = props.selectedEvent;

    if (!event) return <div className="center"><p>Loading...</p></div>

    return <>
        <Head>
            <title>{event.title}</title>
            <meta name='description' content='Fund a lot of great evebts that allow you to envolve...' />
        </Head>
        <EventSummary title={event.title} />
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
        <EventContent>
            <p>{event.description}</p>
        </EventContent>
        <Comments eventId={event.id} />
    </>
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: { selectedEvent: event },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(function (event){
        return { params: { eventId: event.id } }
    });

    return {
        paths: paths,
        fallback: 'blocking' //NextJS will not serve anything until we're done generating this page
    };
}

export default EventDetailPage;