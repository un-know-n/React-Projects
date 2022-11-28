import React, { FC, memo, useRef, useState } from 'react';

import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { CartSection } from './CartSection/CartSection';
import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';

export const Header: FC = memo(() => {
  const dispatch = useAppDispatch();

  return (
    <>
      <header className='header'>
        <div className='container flex lg:flex-row flex-col '>
          <Logo />
          <Search />
          <CartSection />
        </div>
      </header>
    </>
  );
});
Header.displayName = 'Header';
