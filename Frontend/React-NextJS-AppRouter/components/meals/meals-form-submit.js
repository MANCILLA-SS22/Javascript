'use client';

import { useFormStatus } from "react-dom"; //It gives you status information of the last form submission and ONLY if it's inside a form for which it should give us th status

function MealsFormSubmit() {
    const { pending } = useFormStatus(); //pending: A boolean. If true, this means the parent <form> is pending submission. Otherwise, false.
    return <button disabled={pending}>{pending ? 'Submitting...' : "Share Meal"}</button> //We want to disable the button if we are submitting.
}

export default MealsFormSubmit;