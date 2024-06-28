import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import classes from '../styles/EventForm.module.css';


function EventForm({ method, event }){
  const data = useActionData();          console.log("data", data);
  const navigate = useNavigate();        console.log("navigate", navigate);
  const navigation = useNavigation();    console.log("navigation", navigation);
  const isSubmitting = navigation.state === "submitting";
  
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
        <button type="button" onClick={navigate('..')} disabled={isSubmitting}>Cancel</button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
};

export default EventForm;