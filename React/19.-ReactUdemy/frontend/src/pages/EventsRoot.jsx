import React from 'react'
import EventsNavigation from '../components/EventsNavigation.jsx';
import { Outlet } from 'react-router-dom';

function EventsRoot(){
    return <>
        <EventsNavigation/>
        <Outlet/>
    </>
};

// <Outlet/>  es un componente especial que se utiliza dentro de un componente de enrutamiento padre cuando estás utilizando enrutamiento anidado con React 
// Cuando tienes rutas anidadas, es decir, un componente de enrutamiento que contiene otras rutas dentro de él, necesitas un punto de salida (<Outlet/>) para renderizar esas rutas secundarias.
// Las rutas secundarias en este caso son: EventsPage, EventDetailPage, NewEventPage, EditEventPage

// We render the Outlet component here because we wanna use this EventsRootLayout component as a wrapper around other pages, where the content of those pages 
// should be rendered in this place where I have this Outlet component as a marker, so to say.
export default EventsRoot