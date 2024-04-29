import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import classes from './EventForm.module.css';


function EventForm({ method, event }){
  const data = useActionData();          console.log("data", data);
  const navigate = useNavigate();        console.log("navigate", navigate);
  const navigation = useNavigation();    console.log("navigation", navigation);
  const isSubmitting = navigation.state === "submitting";
  
  function cancelHandler() {
    navigate('..');
  }

  //The "Form" tag will make sure that the browser default of sending a request to the backend will be omitted, but i will take that request that would've been sent and give it to our action 
  //(in this case, actionNewEvent). This is pretty useful because that request will contain all teh data that was submitted as part of the form. That's to say, the 'post' method in Form won't 
  //be sent to the backend automatically, but instead to the our action, and it will include all the form data
  return (
    <Form method={method} className={classes.form}> 
    {data && data.errors && (
      <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>
    )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ""}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ""}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ""}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ""}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>Cancel</button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
};


//We are using a Form element on our <EventForm /> component, so it "submits" the action to the current route path (which React router forwards to our defined action function).  
//We then do the actual requests to the backend with the information and ultimately redirect the client to the the "/events" page.
async function actionNewEvent({request, params}){
  const {method} = request;
  const data = await request.formData();
  const eventData = {
      title: data.get("title"),
      image: data.get("image"),
      date: data.get("date"),
      description: data.get("description")
  };

  let url = "http://localhost:8080/events/";
  if(method === "PATCH"){
    const {id} = params;
    url = "http://localhost:8080/events/"+id;
  }

  const response = await fetch(url, {
      method: method,
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData),
  });

  if(response.status === 422) return response;
  if(!response.ok) throw json({message: "Could not save event."}, {status: 500});

  return redirect("/events");
}; //It's important to keep in mind that we are still on the client side here, just as with the loader, this is code that executes in the browser. THIS IS NO BACKEND CODE.

export {EventForm, actionNewEvent}