import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

async function fetchEvents({signal, searchTerm, max}) { 
    console.log("signal", signal); console.log("searchTerm", searchTerm);
    let url = "http://localhost:3000/events";

    if(searchTerm && max) url += "?search="+ searchTerm + "&max=" + max;
    if(searchTerm) url += "?search="+ searchTerm;
    if(max) url += "?max="+ max;
    
    const response = await fetch(url, { signal });
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    
    const { events } = await response.json();
    return events;
}

async function createNewEvent(eventData) {
    console.log(eventData)
    const response = await fetch(`http://localhost:3000/events`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while creating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();
    return event;
}

async function fetchSelectableImages({ signal }) {
    const response = await fetch(`http://localhost:3000/events/images`, { signal });
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the images');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const { images } = await response.json();
    return images;
}

async function fetchEvent({ id, signal }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();
    return event;
}

async function deleteEvent({ id }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, { method: 'DELETE' });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}

async function updateEvent({ id, event }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ event }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const error = new Error('An error occurred while updating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}

export {queryClient, fetchEvents, createNewEvent, fetchSelectableImages, fetchEvent, deleteEvent, updateEvent};