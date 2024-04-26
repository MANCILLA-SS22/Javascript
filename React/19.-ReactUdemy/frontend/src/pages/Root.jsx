import React from 'react'
import MainNavigation from '../components/MainNavigation.jsx';
import { Outlet } from 'react-router-dom';

function RootLayout(){
    return <>
        <MainNavigation/>
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