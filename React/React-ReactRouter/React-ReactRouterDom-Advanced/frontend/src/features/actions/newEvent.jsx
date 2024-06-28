import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";


async function actionNewEvent({ request, params }) { //(1)
    const { method } = request;
    const data = await request.formData();
    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description")
    };

    let url = "http://localhost:8080/events/";
    if (method === "PATCH") {
        const { id } = params;
        url = "http://localhost:8080/events/" + id;
    }

    const token = getAuthToken();
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            headers: { "Autorization": "Bearer" + token }
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) return response;
    if (!response.ok) throw json({ message: "Could not save event." }, { status: 500 });

    return redirect("/events");
}; //(2)

export {actionNewEvent};

//(1)
//We are using a Form element on our <EventForm /> component, so it "submits" the action to the current route path (which React router forwards to our defined action function).
//We then do the actual requests to the backend with the information and ultimately redirect the client to the the "/events" page.

//(2)
//It's important to keep in mind that we are still on the client side here, just as with the loader, this is code that executes in the browser. THIS IS NO BACKEND CODE.