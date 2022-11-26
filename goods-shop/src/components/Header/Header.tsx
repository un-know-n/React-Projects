import React, { FC, useRef, useState } from 'react';

import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { Logo } from './Logo/Logo';
import { Profile } from './Profile/Profile';
import { Search } from './Search/Search';

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <header className='header'>
        <div className='container flex lg:flex-row flex-col '>
          <Logo />
          <Search />
          <Profile />
        </div>
      </header>
    </>
  );
};
