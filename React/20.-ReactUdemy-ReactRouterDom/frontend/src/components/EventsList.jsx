import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

function render(events){
  const val = events.map(function (event){
    return <li key={event.id} className={classes.item}>
      <Link to={`/events/${event.id}`}>
        <img src={event.image} alt={event.title} />
        <div className={classes.content}>
          <h2>{event.title}</h2>
          <time>{event.date}</time>
        </div>
      </Link>
    </li>    
  });
  return val;
};

export default function EventsList({ events }){ 
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {render(events)}
      </ul>
    </div>
  );
};

//The links for <EventsList/> and <EventDetails/> would be broken when we click on a single event. To fix that, we need to change: 
// <Link to={event.id}></Link>      to      <Link to={`/events/${event.id}`}>   (abolute links)
//so we can now end up in situations the <Link> component us rendered on a page where adding "to={}" to the currently active path would lead to an overall incorrect path