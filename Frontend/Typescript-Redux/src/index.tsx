import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import { App } from './components/App';
import { reducers } from './reducers/main';

const store = createStore(reducers, applyMiddleware(thunk));

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
);