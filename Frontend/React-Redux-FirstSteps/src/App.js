import Counter from './components/Counter.js';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserProfile from './components/UserProfile.js';
import { useSelector } from 'react-redux';

function App() {
  //The state in useSelector() gives us the values in the reducer object in the store file (mainStore.js), and, we can access to the data in auth, which contains other funcion (authSlice.js). 
  //So, we're getting isAuthenticated: false and finally, isAuth = false
  const isAuth = useSelector(state => state.auth.isAuthenticated); 

  return (
    <>
      <Header/>
      {!isAuth ? <Auth/> : <UserProfile/>} {/* At the beggining, we get false. So it'll be shown the <Auth> file */}
      <Counter />
    </>
  );
}

export default App;

// useSelector: Read data from the store. Allows you to extract data from the Redux store state for use in this component, using a selector function.
// useDispatch: This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.