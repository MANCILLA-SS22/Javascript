import { Route } from 'react-router-dom';
import { Fragment } from 'react';
import Navigation from './components/Nav/Navigation';
import Favorites from './containers/Favorites';
import Products from './containers/Products';

function App(){
  return (
    <Fragment>
      <Navigation />
      <main>
        <Route path="/" component={Products} exact />
        <Route path="/favorites" component={Favorites} />
      </main>
    </Fragment>
  );
};

export default App;
