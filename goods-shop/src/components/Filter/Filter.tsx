import React from 'react';

import { Categories } from '../UI/Categories/Categories';
import { SortSelect } from '../UI/Select/Select';

export const Filter = () => {
  return (
    <>
      <div className='flex justify-center items-center xl:flex-row flex-col'>
        <Categories />
        <SortSelect />
      </div>
    </>
  );
};
