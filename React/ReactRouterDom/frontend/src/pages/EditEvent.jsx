import React from 'react'
import EventForm from '../components/EventForm'
import { useRouteLoaderData } from 'react-router-dom'

function EditEventPage(){ //(1)
    const data = useRouteLoaderData("event-detail");
    return <EventForm event={data.event} method="patch"/>
}

export default EditEventPage

//(1)
//We get an error when we use useLoaderData because it searches for the closest available loader data, and the highest level at which it looks for data is the route definition of the route for which the EditEventPage
//component was loaded. So the highest level it looks for data is the "edit" route. Now, we want the "EventDetailLoader".
//So now, we can reuse the "EventDetailLoader" across multiple routes. And remember that <EditEventPage/> and <EventDetailPage/> doesn't have a loader function. That's why we need to use "useRouteLoaderData".