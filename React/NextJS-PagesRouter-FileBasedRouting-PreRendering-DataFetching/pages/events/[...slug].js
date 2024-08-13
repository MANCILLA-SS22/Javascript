//Using Server-side Rendering (SSR)
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
    if (props.hasError) {
        return <>
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>
    }

    const filteredEvents = props.events;
    if (!filteredEvents || filteredEvents.length === 0) {
        return <>
            <ErrorAlert>
                <p>No events found for the chosen filter!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return <>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </>
}

export async function getServerSideProps({ params }) {
    const filterData = params.slug;
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return {
            props: { hasError: true },
            // notFound: true,
            // redirect: {
            //   destination: '/error'
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

    return {
        props: {
            events: filteredEvents,
            date: { year: numYear, month: numMonth },
        },
    };
}

export default FilteredEventsPage;

//The advantage of using SSR is, that the finished page (i.e. a page that contains ALL the content) is served for all requests - including requests coming from search engine crawlers. Pages that load + render 
//content on the client-side only, might be crawled in an incomplete state. Crawlers typically do not wait until more content was loaded or rendered => They crawl the initial state of the website.

/* //Using Client-side Data Fetching
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;
    const { data, error } = useSWR('https://nextjs--data-fetching-default-rtdb.firebaseio.com/events.json', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }
            setLoadedEvents(events);
        }
    }, [data]); //This effect should re-run whenever the data that we fetched changes.

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (!loadedEvents) return <p className='center'>Loading...</p>;
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return <>
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>
    }

    const filteredEvents = loadedEvents.filter(function (event) {
        const eventDate = new Date(event.date);
        return (eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1);
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return <>
            <ErrorAlert>
                <p>No events found for the chosen filter!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>
    }

    const date = new Date(numYear, numMonth - 1);

    return <>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </>
}

export default FilteredEventsPage; */