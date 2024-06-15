import React from 'react'
import PageContent from '../components/PageContent.jsx'
import { useRouteError } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation.jsx';

function ErrorPage(){
    const error = useRouteError();
    let title = "An error ocurred!";
    let message = "Something went wrong!";

    if(error.status === 500) {
        // message = JSON.parse(error.data).message; //Solo funciona si NO usamos: return json({message: "Could not getch events!", status: 500});   en Events.jsx
        message = error.data.message;
    };

    if(error.status === 404) {
        title = "Not found!"
        message = "Could not find resourse or page.";
    }

    return <>
        <MainNavigation/>
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>
}

export default ErrorPage