'use client';

import { useFormStatus } from "react-dom";

function MealsFormSubmit() {
    const { pending } = useFormStatus();

    return (
        <>
            {/* We want to disable the button if we are submitting. So we'll set the disabled prop to pending, so that we do disable the button if the surrounding form 
            is being submitted and we enable it, if that's not the case. */}
            <button disabled={pending}>{pending ? 'Submitting...' : "Share Meal"}</button>
        </>
    )
}

export default MealsFormSubmit;
