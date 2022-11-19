import React, { FC, useRef } from 'react';

import { Item } from './Item/Item';

export const Items: FC = () => {
  const someData = useRef([1, 2, 3, 4, 5, 6]);

  return (
    <>
      <h2 className='my-7'>All items</h2>
      <div className='grid lg:gap-12 md:gap-8 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {someData.current.map((item) => (
          <Item key={item} />
        ))}
      </div>
    </>
  );
};
