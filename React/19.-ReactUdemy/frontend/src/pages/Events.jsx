/* eslint-disable no-throw-literal */
// import { useEffect, useState } from 'react';
import { json, useLoaderData } from 'react-router-dom'; //This is a hook which we can execute to get access to the  closest loader data.
import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    if(data.isError) return <p>{data.message}</p>
    return <EventsList events={data.events} />
};

async function eventsLoader(){ //Once we define the loader, react-router will take any value we return in that function, for example, the response data, and will make that dat available in that page that's being rendered in <EventsPage/> as well as any other components where you need it. 
    const response = await fetch('http://localhost:8080/events');
    if(!response.ok){
        // return {isError: true, message: "Could not fetch events!"};
        // throw { message: "Could not getch events!" };
        // throw new Response(JSON.stringify({message: "Could not getch events!", status: 500}));
        return json({message: "Could not getch events!", status: 500});
        
    }
    return response; 
}; //This function will return a promise sicne we're working with async functions.

export {EventsPage, eventsLoader};