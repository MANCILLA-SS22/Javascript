import { NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from '../styles/EventsNavigation.module.css';

function EventsNavigation(){
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? classes.active : undefined} end>All Events</NavLink>
          </li>
          {render(token)}
        </ul>
      </nav>
    </header>
  );
}

function render(token){
  if(token){
    return(
      <li> 
        <NavLink to="/events/new" className={({ isActive }) => isActive ? classes.active : undefined}>New Event</NavLink> 
      </li>
    )
  }
}

export default EventsNavigation;
