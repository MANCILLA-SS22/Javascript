import { defer, json } from "react-router-dom";

async function loadEvents() { //(1)
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }, { status: 500 }));
        throw json(null, { status: 500, statusText: 'Could not fetch events :(' }); //(2)
    }else{
        const resData = await response.json();
        return resData.events;
    }

};

function eventsLoader() { //(3)
    return defer({ events: loadEvents() }); //(4)
}

export { eventsLoader };

//(1)
//Once we define the loader, react-router will take any value we return in that function, for example, the response data, and will make that date available in that page that's being rendered in <EventsPage/>
//as well as any other components where you need it. This function will return a promise sicne we're working with async functions.

//(2)
//it needs to be "throw", not "return", because when we use "throw" in a loader(), React Router automatically renders the errorElement. If we use return, it will attempt to render the EventsPage.

//(3)
//We don't want to await th promise up there. First we need to delete "async" and then we use the "defer" function. This function must be executed and passed in an object.
//In that object we in the end, bundle all the different HTTP requests we might have going on on this page.

//(4)
//We execute the loadEvents function and we store in this object a value returned by loadEvents which is a promise. We must have a promise (like loadEvents) because if not, then there wouldn't be nothing to defer.