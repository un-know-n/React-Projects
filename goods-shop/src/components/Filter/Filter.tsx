import React from 'react';

import { Categories } from '../UI/Categories/Categories';
import { Select } from '../UI/Select/Select';

export const Filter = () => {
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Select />
      </div>
    </>
  );
};
