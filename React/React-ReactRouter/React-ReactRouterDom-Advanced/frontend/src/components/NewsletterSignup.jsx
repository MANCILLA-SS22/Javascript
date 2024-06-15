import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const {data, state} = fetcher;
  // console.log("data", data, "state", state);

  //All hooks use/preserve some React state. Any component they are attached to will re-render when their (the hook) state changes with the latest values. 
  //So we don't need an additional useEffect hook to get the effect we are looking for in this case.
  //To avoid multiple alerts, you can use the useEffect hook to ensure that the alert is triggered only once when the component mounts. This way, you decouple the alert logic from the rendering cycle. 
  //So it will run on the initial render of the component and thereafter if any of the two state or data changes.
  useEffect(() => {
    if(state === "idle" && data && data.message) window.alert(data.message);
  }, [data, state]);

  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input type="email" name='email' placeholder="Sign up for newsletter..." aria-label="Sign up for newsletter" />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;  

//the "Form" component will trigger the action that belongs to the currently active route. the problem here is that this form is included on all routes because it's part of the "MainNavigation".
//Therefore, we would have to add the action to all routes, and that would be a lot code duplication and also clash with other actions that we might need for our routes.
//To solve this we'll use the useFetcher() hook. When it's executed, gives us an object, and this object includes a bunch of methods and properties. For example, it gives us a "Form" component 
//which is different from the other one we've been using. Now, if we use "fetcher.Form" instead of just "Form", then this will actually still trigger an action but it won't initialize a route transition.
//So, useFetcher should be used whenever we wanna trigger an action or a loader without actually navigating to the page to which the loader (or action) belongs.
//If we use just "Form" then we'll be forwarded to the "/events" route after submitting. So we wanna avoid the transicion, we don't to move to a different route.
//To cut the long story short, useFetcher is basically the tool we should use if we wanna interact with some action or a loader without transitioning (sending requests behind the scenes without triggering any route changes)