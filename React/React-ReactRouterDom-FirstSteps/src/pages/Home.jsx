import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage(){
    const navigate = useNavigate();

    function naviateHandler(){
        navigate("/products");
    }    

    return (
        <div>
            <h1>My home page</h1>
            <p>
                Go to <Link to="/products">the list of products</Link>.
            </p>
            <button onClick={naviateHandler} >Navigate</button>
        </div>
    );
}

export default HomePage