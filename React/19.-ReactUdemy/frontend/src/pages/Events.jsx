import { Await, defer, json, useLoaderData } from 'react-router-dom'; //This is a hook which we can execute to get access to the  closest loader data.
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    const data = useLoaderData(); //This data will be an object that gives us access to the defer value keys ("events", in this case)
    console.log("data", data.events)
    return <>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}> {/* This component can be used in situations to show a fallback whilst we're waiting fro other data to arrive.*/}
            <Await resolve={data.events}>
                {
                    (loadedEvents) => <EventsList events={loadedEvents} />  //We output a dynamic value which must be a function that will be executed by react-router once that data is there. So once the promise (data.events) is resolved. Once we have that data.
                }
            </Await>
        </Suspense>
    </>
};

async function loadEvents(){ //Once we define the loader, react-router will take any value we return in that function, for example, the response data, and will make that dat available in that page that's being rendered in <EventsPage/> as well as any other components where you need it. 
    const response = await fetch('http://localhost:8080/events');
    if(!response.ok) return json({message: "Could not getch events!", status: 500});
    const resData = await response.json();
    return resData.events; 
}; //This function will return a promise sicne we're working with async functions.


//We don't want to await th promise up there. First we need to delete "async" and then we use the "defer" function. This function must be executed and passed in an object. 
//In that object we in the end, bundle all the different HTTP requests we might have going on on this page.
function eventsLoader(){ 
    return defer({ events: loadEvents() }); //We execute the loadEvents function and we store in this object a value returned by loadEvents which is a promise. We must have a promise (like loadEvents) because if not, then there wouldn't be nothing to defer.
}

export {EventsPage, eventsLoader};

//Explanation:
//The EventsPage is made up of two components: 1. A root event component that is the EventsPage's wrapper (the "All Events" and "New Event" buttons). and 2. the events list. 
//The second component slows down the show.  The EventsPage isn't going to show anything until #2 finishes fetching normally.  However, defer changes that by saying "show every gosh darn thing!  
//I don't want to wait for any fetch nonsense"  But then the Await/Suspense code steps in and says "Hold on, we do want to wait to show one thing.  I'll put it in the Await code block so you know 
//not to show it until it's done fetching.  But in the meantime show everything else, including the little message "Loading..." in the Suspense code block." 
//Then defer and Await/Suspense shake hands and say "agreed." So that's why you see All Events and New Events showing up along with Loading... first.  And then you see the list of events.