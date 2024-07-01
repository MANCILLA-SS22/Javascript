import React from 'react';
import Header from './components/Header.jsx';
import Signup from './components/Signup.jsx';
import StateLogin from './components/StateLogin.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Signup />
        <StateLogin/>
      </main>
    </>
  );
}

export default App;
