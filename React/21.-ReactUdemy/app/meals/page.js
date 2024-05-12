import React, { Suspense } from 'react';
import classes from "./page.module.css";
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

async function Meals(){
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}

function MealsPage(){
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created{''} <span className={classes.highlight}>by you</span> </h1>
                <p>Choose your favorite recipe and cook it yourslef. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your favorite recipe.
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals....</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    )
}

export default MealsPage;

//<Suspense>
//It's a component provided by React that allow us to handle loading states and show fallback content until some data or resource has been loadad.
//And NextJS embraces the suspense component and this React concept, and makes sure that whenever you have a component like "Meals", which performs some data 
//fetching and returns such a promise up there, that such components will trigger suspense to show the fallback until they're done. So you don't need to do anything else.