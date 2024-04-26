import React from 'react'
import { json, useLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem';

function EventDetailPage(){
    const data = useLoaderData();
    return <EventItem event={data.event}/>
}

async function EventDetailLoader({request, params}){
    const {id} = params;
    const response = await fetch("http://localhost:8080/events/" + id); //It's not necessary to use "await" since react-router would automatically await for the promise.
    
    if(!response.ok) throw json({message: "Could not getch events!", status: 500});
    return response;
}

export {EventDetailPage, EventDetailLoader}
