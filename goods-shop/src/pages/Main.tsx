import React from 'react';

import { Filter } from '../components/Filter/Filter';
import { Items } from '../components/MainItems/Items';

export const Main = () => {
  return (
    <>
      <div className='content'>
        <div className='container'>
          <Filter />
          <Items />
        </div>
      </div>
    </>
  );
};
