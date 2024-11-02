import { Await, useLoaderData } from 'react-router-dom'; //This is a hook which we can execute to get access to the  closest loader data.
import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { ReviewsError } from './Error-defer';

function EventsPage() { //(1)
    const data = useLoaderData(); //This data will be an object that gives us access to the defer value keys ("events", in this case)

    return <>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={data.events} errorElement={<ReviewsError />}>
                {
                    (loadedEvents) => <EventsList events={loadedEvents} /> //(2)
                }
            </Await>
        </Suspense>
    </>
};

export default EventsPage;

//(1)
//The EventsPage is made up of two components:
//1. A root event component that is the EventsPage's wrapper (the "All Events" and "New Event" buttons).
//2. the events list.
//The second component slows down the show. The EventsPage isn't going to show anything until #2 finishes fetching normally. However, defer changes that by saying:
//"show every gosh darn thing! I don't want to wait for any fetch nonsense" But then the Await/Suspense code steps in and says "Hold on, we do want to wait to show one thing.
//I'll put it in the Await code block so you knownot to show it until it's done fetching. But in the meantime show everything else, including the little message "Loading..." in the Suspense code block."
//Then defer and Await/Suspense shake hands and say "agreed". So that's why you see AllEvents and NewEvents showing up along with Loading... first.  And then you see the list of events.

//(2)
//We output a dynamic value which must be a function that will be executed by react-router once that data is there. So once the promise(data.events) is resolved, once we have that data.
//In this case, the "loadEvents" stands for the data in the "resolve" method which has data.events