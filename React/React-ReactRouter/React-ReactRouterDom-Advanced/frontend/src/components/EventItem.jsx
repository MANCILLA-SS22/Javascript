import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from '../styles/EventItem.module.css';

function EventItem({ event, params }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if(proceed) submit(null, {method: "delete"}); //the first argument in "submit" is the data that we wanna submit. And that data will be wrapped in a form data object which we could extract.
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
