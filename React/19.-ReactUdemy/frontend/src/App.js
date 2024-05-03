import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import {EventsPage, eventsLoader} from "./pages/Events.jsx";
import {EventDetailPage, EventDetailLoader, actionEventDetail} from "./pages/EventDetail.jsx";
import NewEventPage from "./pages/NewEvent.jsx";
import EditEventPage from "./pages/EditEvent.jsx";
import RootLayout from "./pages/Root.jsx";
import EventsRoot from "./pages/EventsRoot.jsx";
import ErrorPage from "./pages/Error.jsx";
import { actionNewEvent } from "./components/EventForm.jsx";
import { NewsletterPage, newsletterAction } from "./pages/Newsletter.jsx";
import {actionAuth, AuthenticationPage} from "./pages/Authentication.jsx";
import { logoutAction } from "./pages/Logout.jsx";
import { checkAuthLoader, tokenLoader } from "./utils/auth.jsx";

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
        children: [ //We use relative urls because it's nested in the "/" route
          { index: true, element: <EventsPage/>, loader: eventsLoader}, // loader: It's a property that wants a function as a value. This function will be executed by a ract router whnenever we are about to visit this route. So just before this route gets rendered, just before this <EventsPage/> gets rendered, the loader function will be triggered.
          {
            path: ":id", 
            id: "event-detail",
            loader: EventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage/>, action: actionEventDetail},
              { path: "edit", element: <EditEventPage/>, action: actionNewEvent, loader: checkAuthLoader} ,
            ],
          },
          { path: "new", element: <NewEventPage/>, action: actionNewEvent, loader: checkAuthLoader}, //Here, <NewEventPage/> is first executed, then the "action" is executed.
        ]
      },
      {
        path: "/auth",
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
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};