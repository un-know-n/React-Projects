import React, { FC, memo } from 'react';

import { CartSection } from './CartSection/CartSection';
import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';

type TProps = {
  includeSearch?: boolean;
  includeCartSection?: boolean;
};

export const Header: FC<TProps> = memo(
  ({ includeCartSection = true, includeSearch = true }) => {
    return (
      <>
        <header className='header'>
          <div className='container flex lg:flex-row flex-col '>
            <Logo />
            {includeSearch && <Search />}
            {includeCartSection && <CartSection />}
          </div>
        </header>
      </>
    );
  },
);
Header.displayName = 'Header';
