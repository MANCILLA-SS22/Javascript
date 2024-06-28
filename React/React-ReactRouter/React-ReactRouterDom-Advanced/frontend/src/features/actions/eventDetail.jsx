import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";


async function actionEventDetail({ request, params }) {
    const { id } = params;
    const token = getAuthToken();
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method,
        headers: { "Autorization": "Bearer" + token }
    });
    if (!response.ok) throw json({ message: "Could not delete event!", status: 500 });
    return redirect("/events")
};

export {actionEventDetail};