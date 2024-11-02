import React from 'react';
import classes from "./meals-grid.module.css";
import MealItem from './meal-item';

function MealsGrid({ meals }) {
    return <>
        <ul className={classes.meals}>
            {
                meals.map(function (event) {
                    return <>
                        <li key={event.id}>
                            <MealItem {...event} />
                        </li>
                    </>
                })
            }
        </ul>
    </>
}

export default MealsGrid;