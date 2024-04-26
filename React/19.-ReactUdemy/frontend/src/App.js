import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import {EventsPage, eventsLoader} from "./pages/Events.jsx";
import {EventDetailPage, EventDetailLoader} from "./pages/EventDetail";
import {NewEventPage, actionNewEvent} from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root.jsx";
import EventsRoot from "./pages/EventsRoot.jsx";
import ErrorPage from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      { 
        path: "events",
        element: <EventsRoot/>,
        children: [ //We use relative urls because it's nested in the "/" route
          { index: true, element: <EventsPage/>, loader: eventsLoader}, // loader: It's a property that wants a function as a value. This function will be executed by a ract router whnenever we are about to visit this route. So just before this route gets rendered, just before this <EventsPage/> gets rendered, the loader function will be triggered.
          { 
            path: ":id", 
            id: "event-detail",
            loader: EventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage/>},
              { path: "edit", element: <EditEventPage/>},
            ],
          },
          { path: "new", element: <NewEventPage/>, action: actionNewEvent},
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};