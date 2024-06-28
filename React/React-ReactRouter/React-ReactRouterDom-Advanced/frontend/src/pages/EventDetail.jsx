import { Suspense } from 'react'
import { Await, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem.jsx';
import EventsList from '../components/EventsList.jsx';
import { ReviewsError } from './Error-defer.jsx';

function EventDetailPage(){  
    const data = useRouteLoaderData('event-detail'); //(1)
    return <>

        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={data.event}> {/* <Await resolve={data.event} errorElement={<ReviewsError />}> */}
                {loadEventAwait => <EventItem event={loadEventAwait}/>}
            </Await>
        </Suspense>

        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={data.events} errorElement={<ReviewsError />} >
                {loadEventsAwait => <EventsList events={loadEventsAwait}/>}
            </Await>             
        </Suspense>
        
    </>
}

export default EventDetailPage;

//(1)
//We get an error when we use useLoaderData because it searches for the closest available loader data, and the highest level at which it looks for data is the route definition of the route for which the EditEventPage
//component was loaded. So the highest level it looks for data is the "edit" route. Now, we want the "EventDetailLoader".
//So now, we can reuse the "EventDetailLoader" across multiple routes. And remember that <EditEventPage/> and <EventDetailPage/> doesn't have a loader function. That's why we need to use "useRouteLoaderData".