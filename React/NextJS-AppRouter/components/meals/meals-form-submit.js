'use client';

import { useFormStatus } from "react-dom";

function MealsFormSubmit() {
    const { pending } = useFormStatus();
    return <button disabled={pending}>{pending ? 'Submitting...' : "Share Meal"}</button> //(1)
}

export default MealsFormSubmit;

//(1)
//We want to disable the button if we are submitting. So we'll set the disabled prop to pending, so that we do disable the button if the surrounding form is being submitted and we enable it, if that's not the case.