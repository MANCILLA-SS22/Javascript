import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import classes from '../styles/NewsletterSignup.module.css';

function NewsletterSignup() {
  const {Form, data, state} = useFetcher();
  console.log("data", data);
  console.log("state", state)

  useEffect(() => { //(1)
    if(state === "idle" && data && data.message) window.alert(data.message);
  }, [data, state]);

  return ( // (2)
    <Form method="post" action='newsletter' className={classes.newsletter}> 
      <input type="email" name='email' placeholder="Sign up for newsletter..." aria-label="Sign up for newsletter" />
      <button>Sign up</button>
    </Form>
  );
}

export default NewsletterSignup;  

//(1)
//All hooks use/preserve some React state. Any component they are attached to will re-render when their (the hook) state changes with the latest values.
//So we don't need an additional useEffect hook to get the effect we are looking for in this case.
//To avoid multiple alerts, you can use the useEffect hook to ensure that the alert is triggered only once when the component mounts. This way, you decouple the alert logic from the rendering cycle.
//So it will run on the initial render of the component and thereafter if any of the two state or data changes.

//(2)
//the "Form" component will trigger the action that belongs to the currently active route. The problem here is that this form is included on all routes because it's part of the "MainNavigation".
//Therefore, we would have to add the action to all routes, and that would be a lot code duplication and also clash with other actions that we might need for our routes.
//To solve this we'll use the useFetcher() hook. Now, if we use "fetcher.Form" instead of just "Form", then this will actually still trigger an action but it won't initialize a route transition.
//So, useFetcher should be used whenever we wanna trigger an action or a loader without actually navigating to the page to which the loader (or action) belongs.