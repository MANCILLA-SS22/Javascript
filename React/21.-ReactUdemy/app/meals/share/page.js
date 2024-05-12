'use client';

import { useFormState } from "react-dom";
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions.js';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

function ShareMealPage(){
    const [state, formAction] = useFormState(shareMeal, {message: null});
    console.log(state)
    return (
        <>
            <header className={classes.header}>
                <h1>Share your <span className={classes.highlight}>favorite meal</span></h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}> {/* This kind of actions (action={shareMeal}) ARE SUPPORTED by NextJS and React here that will ensure that when this form is submitted, Next.js will, behind the scenes, create a request and send it to this Next.js server that's serving the website so that the "SharedMealPage" function gets triggered, and you can then handle the form submission there, but on the server. */}
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea id="instructions" name="instructions" rows="10" required ></textarea>
                    </p>
                    <ImagePicker label="Your image" name="image"/>
                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                        <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    );
};

export default ShareMealPage;

//useFormState();
//This hooks is responsible for managing the state of "ShareMealPage" which uses a form that will be submitted with help of server-actions.
//The first argument is the actual server-action that should be triggered when the form is submitted.
//The second argument is the initial state of this component that should be returned by "useFormState" before the shareMeal has been triggered and yielded a repsonse.

//state
//It's the current response of this page here (component). So the latest response returned by this Server Action in the end or this initial state if no response has been received yet.
//That state (shareMeal) depends on the execution of that Server Action and its response. And, we can the use this state, which will essentially be either "{messaje: null}" or
//any response we got back from ShareMeal to output data in this component.

//formAction
//The second one should actually set as a value for the action prop on the form. 