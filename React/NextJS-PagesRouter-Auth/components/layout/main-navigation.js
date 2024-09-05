import Link from 'next/link';
import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/client';

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        {!session && !loading && (
          <li>
            <Link href='/auth'>Login</Link>
          </li>
        )}
        {session && (
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
        )}
        {session && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </nav>
    </header>
  );
}

export default MainNavigation;
