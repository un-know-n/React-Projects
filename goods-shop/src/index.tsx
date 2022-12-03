import './api/firebase.api';
import './index.scss';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { app } from './api/firebase.api';
import App from './App';
import { AuthContext } from './context/auth';
import { persistor, store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const auth = getAuth(app);
const firestore = getFirestore();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthContext.Provider value={{ auth, firestore }}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </PersistGate>
      </AuthContext.Provider>
    </Provider>
  </BrowserRouter>,
);

//Listeners for the refetch/reconnect
setupListeners(store.dispatch);
