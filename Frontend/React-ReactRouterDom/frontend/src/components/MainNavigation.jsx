import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from '../styles/MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={ ({ isActive }) => isActive ? classes.active : undefined } end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? classes.active : undefined}>Events</NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={({ isActive }) => isActive ? classes.active : undefined } > Newsletter </NavLink>
          </li>
          {render(token)}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
};

function render(token){
  if(!token) return <li> <NavLink to="/auth?mode=login" className={({ isActive }) => isActive ? classes.active : undefined} > Authentication </NavLink> </li>
  
  return( 
    <li>
      <Form action="/logout" method="post"> 
        <button>Logout</button>
      </Form>
    </li>
  )
}

export default MainNavigation;