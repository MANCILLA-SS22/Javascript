import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './app/store';

//This lines of code are useful to render the content for the first time whenever the app loads.
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate()); //initiate() gets that initial data and requested at that point. So we can load that data once again as the app starts up.
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
);
