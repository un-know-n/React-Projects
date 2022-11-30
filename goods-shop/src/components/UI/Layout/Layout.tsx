import React, { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import { Header } from '../../Header/Header';

type TProps = {
  includeHeader?: boolean;
};

const Layout: FC<PropsWithChildren<TProps>> = ({
  children,
  includeHeader = false,
}) => {
  return (
    <>
      <div className='wrapper'>
        {includeHeader && <Header />}
        {children}
      </div>

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
};

export default Layout;
