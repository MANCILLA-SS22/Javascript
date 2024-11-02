import React from 'react'
import EventsNavigation from '../components/EventsNavigation.jsx';
import { Outlet } from 'react-router-dom';

function EventsRoot(){
    return <>
        <EventsNavigation/>
        <Outlet/>
    </>
};

export default EventsRoot