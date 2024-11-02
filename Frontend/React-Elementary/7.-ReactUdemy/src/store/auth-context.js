import React, { createContext,  useState, useEffect } from 'react';

/* const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: function(){},
  onLogin: function (email, password){}
}); */

const AuthContext = createContext();

export function AuthContextProvider(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { //We don't wanna run directly the code inside the useEffect in the component funcion, because now this funcion is executed by react and it is executed after every component re-evaluation. So, whenever App component ran thereafter, the useEffect will run, and if we update setIsLoggedIn(true), the component will run again. But this useEffect won't just run after every component evaluation, but only if the dependencies array changed. For the first time, this hook will forcibly be executed, and for the next render, we'll need to specify when this should be executed again.
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true); // We should of course check email and password. But it's just a dummy/ demo anyways
    }
  }, []);

  function logoutHandler() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  function loginHandler() {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const date = {
    isLoggedIn: isLoggedIn, 
    onLogout: logoutHandler, 
    onLogin: loginHandler
  }

  return (
    <AuthContext.Provider value={date}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
