import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppRouter from './components/UI/AppRouter/AppRouter';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default App;
