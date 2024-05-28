import { Fragment } from 'react';
import Header from './components/Header.jsx';
import Quiz from './components/Quiz.jsx';

function App() {

  return (
    <Fragment>
      <Header />
      <main>
        <Quiz/>
      </main>
    </Fragment>
  );
}

export default App;
