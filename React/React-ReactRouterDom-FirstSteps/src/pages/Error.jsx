import React from 'react';
import MainNavigation from '../components/MainNavigation.jsx';

function ErrorPage(){
    return (<>
        <MainNavigation/>
        <main>
            <h1>An error ocurred!</h1>
            <p>Could not find this page!</p>
        </main>    
    </>
    );
}

export default ErrorPage;