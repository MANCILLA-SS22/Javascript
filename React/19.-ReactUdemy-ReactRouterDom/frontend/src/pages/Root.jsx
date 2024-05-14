import React, { useEffect } from 'react'
import MainNavigation from '../components/MainNavigation.jsx';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../utils/auth.jsx';

function RootLayout(){
    const token = useLoaderData();
    const submit = useSubmit(); //It gives us a submit function which we can use to programmatically submit a form. Here we wanna basically submit that logout form which we have in MainNavigation. We wanna send that logout request.
    
    useEffect(() => {
        if(!token) return;
        if(token === "EXPIRED"){
            submit(null, {action: "/logout", method: "post"});
            return;
        }
        const tokenDuration = getTokenDuration();
        console.log(tokenDuration)

        setTimeout(() => {
            submit(null, {action: "/logout", method: "post"}); //the first argument in "submit" is the data that we wanna submit. And that data will be wrapped in a form data object which we could extract.
        }, tokenDuration);
        
    }, [token, submit]);

    return <>
        <MainNavigation/>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <main>
            <Outlet/>
        </main>
    </>
};

export default RootLayout;

// <Outlet/>  es un componente especial que se utiliza dentro de un componente de enrutamiento padre cuando estás utilizando enrutamiento anidado con React 
// Cuando tienes rutas anidadas, es decir, un componente de enrutamiento que contiene otras rutas dentro de él, necesitas un punto de salida (<Outlet/>) para renderizar esas rutas secundarias.

// The <main> tag specifies the main content of a document. The content inside the <main> element should be unique to the document. It should not contain any content that is 
// repeated across documents such as sidebars, navigation links, copyright information, site logos, and search forms.
// Outlet is what represents the content that is unique to the app. So basically it loads different views based on the route that gets visited. So semantically using the 
// main element makes sense but ofcourse one can use any other element as well. There is no mandatory thing here.