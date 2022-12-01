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
    </>
  );
};

export default Layout;
