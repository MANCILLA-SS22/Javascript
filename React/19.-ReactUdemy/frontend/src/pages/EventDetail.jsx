import React, { Suspense } from 'react'
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem.jsx';
import EventsList from '../components/EventsList.jsx';
import { getAuthToken } from '../utils/auth.jsx';

function EventDetailPage(){
    //We get an error when we use useLoaderData because it searches for the closest available loader data, and the highest level at which it looks for data is the route definition of the route for which
    //the EditEventPage component was loaded. So the highest level it looks for data is the "edit" route. Now, we want the "EventDetailLoader".
    //The "useRouteLoaderData" hook allow us to get access to a higher level loader from a route that doesn't have a loader. So now, we can reuse the "EventDetailLoader" across multiple routes. And remember
    //that <EditEventPage/> doesn't have a loader function as <EventDetailPage/> does. That's why we need to use --> useRouteLoaderData("event-detail");    
    const data = useRouteLoaderData('event-detail');
    return <>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={data.event}>
                {loadEventAwait => <EventItem event={loadEventAwait}/>}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={data.events}>
                {loadEventsAwait => <EventsList events={loadEventsAwait}/>}
            </Await>             
        </Suspense>
        
    </>
}

async function loadEvent(id){
    const response = await fetch("http://localhost:8080/events/"+id); //It's not necessary to use "await" since react-router would automatically await for the promise.
    if(!response.ok) throw json({message: "Could not getch events!", status: 500});
    const resData = await response.json();
    return resData.event; 
}

async function loadEvents(){ //Once we define the loader, react-router will take any value we return in that function, for example, the response data, and will make that dat available in that page that's being rendered in <EventsPage/> as well as any other components where you need it. 
    const response = await fetch('http://localhost:8080/events');
    if(!response.ok) return json({message: "Could not getch events!", status: 500});
    const resData = await response.json();
    return resData.events; 
}; //This function will return a promise sicne we're working with async functions.

async function EventDetailLoader({request, params}){
    const {id} = params;
    return defer({ //We defer here because loadEvents take a while because we have a two second timeOut on the backend whereas loadEvent should be rather fast
        //Here, "await" will make sure that defer waits for this data to be loaded before loading this page component at all. So  before moving and navigating to this page 
        //componenet but will load this data, the loadEvents data after the page was loaded. 
        //"await" is like our lever or switch for controlling wich data should be awaited before moving to this page and which data should be deferred so where you wanna load the data after moving to the page. 
        //So, whit this setup, we would wait for the event details to be loaded before loading this page componenet at all, but we would load the list of events after rendering this page.
        event: await loadEvent(id),
        events: loadEvents()
    }); 
    
}

async function actionEventDetail({ request, params }){
    const {id} = params;
    const token = getAuthToken();
    const response = await fetch("http://localhost:8080/events/"+id, {
        method: request.method,
        headers: { "Autorization": "Bearer"+ token }
    });
    if(!response.ok) throw json({message: "Could not delete event!", status: 500});
    return redirect("/events")
}

export {EventDetailPage, EventDetailLoader, actionEventDetail}
