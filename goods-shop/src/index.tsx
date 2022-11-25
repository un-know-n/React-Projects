import './index.scss';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { setupStore } from './store';

//Store creation
export const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

//Listeners for the refetch/reconnect
setupListeners(store.dispatch);
