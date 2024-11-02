import { defer, json } from "react-router-dom";

async function loadEvent(id) { //It's not necessary to use "await" since react-router would automatically await for the promise.
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) throw json({ message: 'Could not fetch details for selected event 😡' }, { status: 500 });
    const resData = await response.json();
    return resData.event;
}

async function loadEvents() { //(1)
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) throw json(null, { status: 500, statusText: 'Could not fetch events 🥶' });
    const resData = await response.json();
    return resData.events;
}

async function eventDetailLoader({ request, params }) {
    const { id } = params;
    return defer({
        event: await loadEvent(id), //(2)
        events: loadEvents()
    });
};

export { eventDetailLoader };

//(1)
//Once we define the loader, react-router will take any value we return in that function, for example, the response data, and will make that data available in that page that's being rendered in <EventsPage/>
//as well as any other components where you need it. This function will return a promise sicne we're working with async functions.

//(2)
//Here, "await" will make sure that defer waits for "event" data to be loaded before loading this page component at all. So  before moving and navigating to this page componenet but will load "events" data, 
//after the page was loaded. "await" is like our lever or switch for controlling wich data should be awaited before moving to this page and which data should be deferred so where you wanna load 
//the data after moving to the page. So, with this setup, we would wait for the eventDetails to be loaded before loading this page componenet at all, but we would load the list of events after rendering this page.

//NOTE: Whenever we use "defer", we have two options to handle errors:
// 1. In the case of "event", we're using "await" so this will allow us to throw an error as in the line 5. And, if we'd want to retrieve that error, we should use the "useRouteError()" hook.
//    It's important to note that the Error.jsx file will be added to "errorElement" in "createBrowserRouter" (App.js).
// 2. In the case of "events", we're NOT using "await", so we'll get an async error response. Unlike "event", we need to add some aditional data. For instance, we have to work with "errorElement", an element
//    that belongs to <Await>. This element will allow us to render a component but, now we'd also need to throw the error response in a different way, as in the line 12. Finally, to retrieve this response
//    we'll use the "useAsyncError()" hook. See the EventDetail.jsx file to note the errorElement={<ReviewsError />}. It's important to note that the Error-defer.jsx file will NOT be added to "errorElement" but in
//    the <Await> component. Like this ---> <Await resolve={data.events} errorElement={<ReviewsError />} >