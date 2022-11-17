import React from 'react';

import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

export const Inner = () => {
  return (
    <>
      <div className='content'>
        <div className='container container--cart'>
          <div className='cart'>
            <Header />
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
