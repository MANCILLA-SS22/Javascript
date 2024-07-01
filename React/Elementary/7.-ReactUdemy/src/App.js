import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);

  /* The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. 
  Providers can be nested to override values deeper within the tree. All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes."
  This was given in react documentation. So from my understanding, here we are using useContext inside the App . So according to the documentation, the AuthContextProvider 
  should be wrapped around the parent of App the component i.e. inIndex.js  so that it could be consumed by App and its descendants. 
  So in your code, you cannot subscribe and consume the context at the same time in the same component, so it's wrapped around App in it's parent component. */

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;