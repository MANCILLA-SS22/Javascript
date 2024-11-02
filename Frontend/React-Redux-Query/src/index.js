import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider api={apiSlice}>
    <App />
  </ApiProvider>
);