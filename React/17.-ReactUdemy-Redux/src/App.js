import Counter from './components/Counter.js';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserProfile from './components/UserProfile.js';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

// useSelector: Read data from the store with the useSelector hook
// useDispatch: Get the dispatch function with the useDispatch hook, and dispatch actions as needed

function App() {
  const isAuth = useSelector(function(state){ //The state in useSelector() gives us the values in the reducer object in the store file (mainStore.js)...
    return state.auth.isAuthenticated; //...and, we can access to the data in auth, which contains other funcion (authSlice.js). So, we're getting isAuthenticated: false and finally, isAuth = false
  });

  return (
    <Fragment>
      <Header/>
      {!isAuth ? <Auth/> : <UserProfile/>} {/* At the beggining, we get false. So it'll be shown the <Auth> file */}
      <Counter />
    </Fragment>
  );
}

export default App;
