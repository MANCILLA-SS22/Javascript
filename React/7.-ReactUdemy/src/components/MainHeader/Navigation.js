import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

function Navigation() {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>

        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
            <a href="/">Admin</a>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}        
      </ul>
    </nav>
  );
};

export default Navigation;
