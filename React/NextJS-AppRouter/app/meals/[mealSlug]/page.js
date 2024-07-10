import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from "./page.module.css";

export async function generateMetadata({params}){ //When we wanna export dynamic metadata, we must use an async function
    const meal = getMeal(params.mealSlug);
    if (!meal) notFound();
    return {title: meal.title, description: meal.summary};
};

function MealDetailsPage({params}){
    const meal = getMeal(params.mealSlug);
    if(!meal) notFound();
    meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    return <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={`https://germanmancilla-nextjs-demo-users-image.s3.us-west-1.amazonaws.com/${meal.image}`} alt={meal.title} fill/>
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}> by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a> </p>
                <p className={classes.summary}> {meal.summary} </p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
        </main>
    </>
};

export default MealDetailsPage;

//dangerouslySetInnerHTML is a feature in React that lets you inject raw HTML into your components. We use it when we need to render HTML content that comes from a source we don't fully trust, or when 
//we want to dynamically generate HTML. However, it's called "dangerous" because using it incorrectly can expose your app to security risks like cross-site scripting(XSS) attacks. So, we only use 
//dangerouslySetInnerHTML when we're confident that the HTML we're injecting is safe and properly sanitized.