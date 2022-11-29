import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { persistor, store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);

//Listeners for the refetch/reconnect
setupListeners(store.dispatch);
