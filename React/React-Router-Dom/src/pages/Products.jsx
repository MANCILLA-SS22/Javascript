import React from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
    {id: 'p1', title: 'Product 1'},
    {id: 'p2', title: 'Product 2'},
    {id: 'p3', title: 'Product 3'}
];

function render(){
    return PRODUCTS.map(function(event){
        return (
            <li key={event.id}>
                <Link to={`/products/${event.id}`}>{event.title}</Link>
            </li>
        );
    });
};

function ProductsPage(){
    return (
        <>
            <h1>ProductsPage</h1>
            <ul>
                {render()}
            </ul>
        </>
    )
}


export default ProductsPage;