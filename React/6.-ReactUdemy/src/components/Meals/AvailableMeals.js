import React from 'react';
import classes from "./AvailableMeals.module.css"
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },    
];
function AvailableMeals() {

    const meanlsList = DUMMY_MEALS.map(function(event){
        return (
            <li>
                <MealItem key={event.id} id={event.id} name={event.name} description={event.description} price={event.price}/>
            </li>
        )
    }); 

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meanlsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals