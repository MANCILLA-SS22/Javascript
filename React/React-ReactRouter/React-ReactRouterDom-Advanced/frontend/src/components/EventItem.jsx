import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from '../styles/EventItem.module.css';

function EventItem({ event, params }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit(); //This hook return a function

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) submit(null, { method: "delete" });//We won't always use the Form component so send data. So we could just use a button instead of a full Form to send an http method, like PATCH or DELETE. 
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {
        token && (
          <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete</button>
          </menu>
        )
      }
    </article>
  );
}

export default EventItem;
