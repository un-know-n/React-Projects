import React, { FC, useRef } from 'react';

import { useFetchAllProductsQuery } from '../../api/products.api';
import { Item } from './Item/Item';

export const Items: FC = () => {
  const { isLoading, isError, data, error } = useFetchAllProductsQuery(10);

  return (
    <>
      <h2 className='my-7'>All items</h2>
      {!isLoading && !isError && (
        <div className='grid lg:gap-12 md:gap-8 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
          {data?.map((item) => (
            <Item
              {...item}
              key={item.id}
            />
          ))}
        </div>
      )}
    </>
  );
};
