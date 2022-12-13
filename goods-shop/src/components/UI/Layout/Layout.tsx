import React, { FC, PropsWithChildren } from 'react';

import { Header } from '../../Header/Header';

type TProps = {
  includeHeader?: boolean;
  includeHeaderCart?: boolean;
  includeHeaderSearch?: boolean;
};

const Layout: FC<PropsWithChildren<TProps>> = ({
  children,
  includeHeader = false,
  includeHeaderCart = true,
  includeHeaderSearch = true,
}) => {
  return (
    <>
      <div className='wrapper'>
        {includeHeader && (
          <Header
            includeCartSection={includeHeaderCart}
            includeSearch={includeHeaderSearch}
          />
        )}
        {children}
      </div>
    </>
  );
};

export default Layout;
