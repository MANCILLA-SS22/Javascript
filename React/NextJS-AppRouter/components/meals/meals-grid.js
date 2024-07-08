import React from 'react';
import classes from "./meals-grid.module.css";
import MealItem from './meal-item';

function MealsGrid({meals}) {

    function render(){
        const res = meals.map(function (event){
            return <>
                <li key={event.id}>
                    <MealItem {...event}/>
                </li>
            </>
        });

        return res;
    }

    return (
        <>
            <ul className={classes.meals}>
                {render()}
            </ul>
        </>
    )
}

export default MealsGrid;