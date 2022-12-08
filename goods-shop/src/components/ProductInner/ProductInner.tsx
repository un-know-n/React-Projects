import React from 'react';
import { useParams } from 'react-router-dom';

import ProductDescription from './Description';
import ProductMain from './Main';

const ProductInner = () => {
  return (
    <>
      <div className='product__wrapper w-full flex justify-center  p-9'>
        <ProductMain
          cartCount={0}
          rating={{ rate: 0, count: 0 }}
        />
        <ProductDescription
          description=''
          price={123}
          rating={{ rate: 0, count: 0 }}
        />
      </div>
    </>
  );
};

export default ProductInner;
