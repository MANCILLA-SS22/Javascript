import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/Home.jsx";
import EditEventPage from "./pages/EditEvent.jsx";
import NewEventPage from "./pages/NewEvent.jsx";
import RootLayout from "./pages/Root.jsx";
import EventsRoot from "./pages/EventsRoot.jsx";
import ErrorPage from "./pages/Error.jsx";
import NewsletterPage from "./pages/NewsLetter.jsx";
import EventsPage from "./pages/Events.jsx";
import EventDetailPage from "./pages/EventDetail.jsx";
import AuthenticationPage from "./components/AuthenticationPage.jsx"

import { checkAuthLoader } from "./features/loaders/auth.jsx";
import { tokenLoader } from "./features/loaders/auth.jsx";
import { eventDetailLoader } from "./features/loaders/eventDetail.jsx";
import { eventsLoader } from "./features/loaders/events.jsx";
import { actionAuth } from "./features/actions/auth.jsx";
import { actionEventDetail } from "./features/actions/eventDetail.jsx";
import { logoutAction } from "./features/actions/logout.jsx";
import { newsletterAction } from "./features/actions/newsletter.jsx";
import { actionNewEvent } from "./features/actions/newEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    id: "root",
    loader: tokenLoader,
    children: [
      {index: true, element: <HomePage/>},
      { 
        path: "events",
        element: <EventsRoot/>,
        children: [ //We use relative urls because they're nested in the "/" route.
          { index: true, element: <EventsPage/>, loader: eventsLoader},
          {
            path: ":id", 
            id: "event-detail",
            loader: eventDetailLoader, //This is like a global loader that could be used by the children componenets. In this case, both "EventDetailPage" and "EditEventPage" will be able to get access to this loader
            children: [
              { index: true, element: <EventDetailPage/>, action: actionEventDetail},
              { path: "edit", element: <EditEventPage/>, action: actionNewEvent, loader: checkAuthLoader}
            ],
          },
          { path: "new", element: <NewEventPage />, action: actionNewEvent, loader: checkAuthLoader } //Here, the "loader" is first executed, then the <NewEventPage/> is rendered and will execute the "action" method
        ]
      },
      {
        path: "/auth", //This is an absolute path because it starts with a slash. This means that it's always seen from after the domain name.
        element: <AuthenticationPage/>,
        action: actionAuth
      },
      {
        path: "newsletter",
        element: <NewsletterPage/>,
        action: newsletterAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router}/>;
};

//If we would have the following lines of code, 
// { path: "/events/:eventId", element: <EditEventPage/> }
// { path: "/events/new", element: <EditEventPage/> }
//The route with teh path "/events/new" might actually never get activated because "new" could also be treated or seen as a value for the eventId. So whenever we enter "/events/new" in the URL bar, 
//React Router could actually load the "/events/:eventId" route instead of "/events/new" because it treats new as a value for eventId.
