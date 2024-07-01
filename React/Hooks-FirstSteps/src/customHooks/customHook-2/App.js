import React, { Fragment } from 'react';
import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';

function App() {
  return (
    <Fragment>
      <ForwardCounter />
      <BackwardCounter />
    </Fragment> 
  );
}

export default App;
