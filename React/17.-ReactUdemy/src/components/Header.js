import classes from '../components/css/Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

function Header(){
  const dispatch = useDispatch(); //When using useDespatch, we get the funcions contained in the slice files. In this case They'll be login() and logout().
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  function logoutHandler(){
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li><a href='/'>My Products</a></li>
            <li><a href='/'>My Sales</a></li>
            <li><button onClick={logoutHandler}>Logout</button></li>
          </ul>
        </nav>)
      }
    </header>
  );
};

export default Header;
