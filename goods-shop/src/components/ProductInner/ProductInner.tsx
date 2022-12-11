import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchProductByIdQuery } from '../../api/products.api';
import { useFetchUsersByProductQuery } from '../../api/users.api';
import CommentsBlock from '../UI/Comments';
import CommentsInput from '../UI/CommentsInput';
import Loader from '../UI/Loader/Loader';
import ProductDescription from './Description';
import ProductMain from './Main';

const ProductInner = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading: loadingProduct,
    isError: productError,
  } = useFetchProductByIdQuery(id!);

  const {
    data: users,
    isLoading: loadingUsers,
    isError: usersError,
  } = useFetchUsersByProductQuery(id!);

  const loadingDone = !loadingProduct && !loadingUsers;
  const noErrors = !productError && !usersError;
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setSelectedSize(product?.size ? product.size[0] : '');
  }, [product?.size]);

  return (
    <>
      {loadingDone && noErrors ? (
        <>
          <div className='product__wrapper w-full flex flex-col md:flex-row justify-center p-9'>
            <ProductMain
              image={product?.image || ''}
              category={product?.category!}
              id={product?.id!}
              title={product?.title!}
              price={product?.price!}
              size={selectedSize!}
              rating={product?.rating || { rate: 5, count: 0 }}
            />
            <ProductDescription
              selectedSize={selectedSize!}
              setSelectedSize={(s) => setSelectedSize(s)}
              size={product?.size}
              description={product?.description || ''}
              price={product?.price || 0}
              rating={product?.rating || { rate: 5, count: 0 }}
            />
          </div>
          <div className='comments__wrapper p-9'>
            <CommentsInput />
            {users?.map((user) => (
              <CommentsBlock
                author={user.name}
                image={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
                status='Customer'
                text={user.body}
                key={`${user.id}${user.body}`}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='w-full h-screen flex flex-col md:flex-row justify-center p-9'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProductInner;
