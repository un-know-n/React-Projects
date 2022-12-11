import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchProductByIdQuery } from '../../api/products.api';
import CommentsBlock from '../UI/Comments';
import CommentsInput from '../UI/CommentsInput';
import Loader from '../UI/Loader/Loader';
import ProductDescription from './Description';
import ProductMain from './Main';

const ProductInner = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: loadingProduct,
    isError,
  } = useFetchProductByIdQuery(id!);

  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setSelectedSize(data?.size ? data.size[0] : '');
  }, [data?.size]);

  return (
    <>
      <div className='product__wrapper w-full flex flex-col md:flex-row justify-center p-9'>
        {loadingProduct ? (
          <Loader />
        ) : (
          <>
            <ProductMain
              image={data?.image || ''}
              category={data?.category!}
              id={data?.id!}
              title={data?.title!}
              price={data?.price!}
              size={selectedSize!}
              rating={data?.rating || { rate: 5, count: 0 }}
            />
            <ProductDescription
              selectedSize={selectedSize!}
              setSelectedSize={(s) => setSelectedSize(s)}
              size={data?.size}
              description={data?.description || ''}
              price={data?.price || 0}
              rating={data?.rating || { rate: 5, count: 0 }}
            />
          </>
        )}
      </div>
      <div className='comments__wrapper p-9'>
        <CommentsInput />
        <CommentsBlock
          author='asd'
          image='asd'
          status='asd'
          text='asd'
        />
      </div>
    </>
  );
};

export default ProductInner;
