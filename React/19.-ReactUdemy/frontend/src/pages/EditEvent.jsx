import React from 'react'
import EventForm from '../components/EventForm'
import { useRouteLoaderData } from 'react-router-dom'

function EditEventPage(){
    //We get an error when we use useLoaderData because it searches for the closest available loader data, and the highest level at which it looks for data is the route definition of the route for which
    //the EditEventPage component was loaded. So the highest level it looks for data is the "edit" route. Now, we want the "EventDetailLoader".
    //The "useRouteLoaderData" hook allow us to get access to a higher level loader from a route that doesn't have a loader. So now, we can reuse the "EventDetailLoader" across multiple routes. And remember
    //that <EditEventPage/> doesn't have a loader function as <EventDetailPage/> does. That's why we need to use --> useRouteLoaderData("event-detail");
    const data = useRouteLoaderData("event-detail");

    return <EventForm event={data.event}/>
}

export default EditEventPage
