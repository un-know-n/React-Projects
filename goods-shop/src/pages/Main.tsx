import React from 'react';

import { Filter } from '../components/Filter/Filter';
import Footer from '../components/Footer/Footer';
import { Items } from '../components/MainItems/Items';

const Main = () => {
  return (
    <>
      <div className='content'>
        <div className='container'>
          <Filter />
          <Items />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Main;
