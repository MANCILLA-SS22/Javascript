import Error from './Error.jsx';
import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.jsx';

const requestConfig = {};

export default function Meals() {
    const { data: loadedMeals,  isLoading: isLoading,  error: error } = useHttp("http://localhost:3000/meals", requestConfig, []);

    if (isLoading) return <p className='center'>Fetching meals...</p>;
    if (error) return <Error title="Filed to fetch meals" message={error} />;

    return (
        <ul id="meals">
            { loadedMeals.map((meal) => (<MealItem key={meal.id} meal={meal}/>)) }
        </ul>
    );
}

/* import { useState, useEffect } from 'react';
import MealItem from './MealItem.jsx';

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();
    }, []); 
    //Now indeed here, we don't have to add any dependencies because this useEffect, is now not using any external props or state or any other values that could change across 
    //renders. The only external thing it's using, is the setLoadedMeals function, which is provided by the useState hook and which is guaranteed by React to never change.

    return (
        <ul id="meals">
            { loadedMeals.map((meal) => (<MealItem key={meal.id} meal={meal}/>)) }
        </ul>
    );
}
 */