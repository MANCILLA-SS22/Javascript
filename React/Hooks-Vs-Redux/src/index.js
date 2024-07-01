/* //Sin custom hooks y con useContext
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureProductStore from './hooks/products-store.js'
import ProductsProvider from "./context/products-context";
import './index.css';

configureProductStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsProvider>
);
 */

//Con custom hooks y sin useContext
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureProductStore from './hooks/products-store.js'
import './index.css';

configureProductStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);