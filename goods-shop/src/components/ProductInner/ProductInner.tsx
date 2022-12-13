import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BiChevronLeftCircle } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import { db } from '../../api/firebase.api';
import { useFetchProductByIdQuery, useLazyFetchSimilarProductsQuery } from '../../api/products.api';
import { useUserAuth } from '../../hooks/useUserAuth';
import { Routes } from '../../routes';
import { errorToast } from '../../utils/helpers/toasts';
import { takeCommentsQuery } from '../../utils/helpers/user/takeCommentsQuery';
import Carousel from '../UI/Carousel';
import CommentsBlock from '../UI/Comments';
import CommentsInput from '../UI/CommentsInput';
import GeneralError from '../UI/Errors';
import NoComments from '../UI/Errors/NoComments';
import Loader from '../UI/Loader/Loader';
import ProductDescription from './Description';
import ProductMain from './Main';
import SimilarProduct from './SimilarProducts';

const ProductInner = () => {
  const { id } = useParams();

  //Check if the user is authorized
  const [user] = useUserAuth();

  //Take information about product
  const {
    data: product,
    isLoading: loadingProduct,
    isError: productError,
  } = useFetchProductByIdQuery(id!);

  //Take similar products for slider
  const [
    fetchSimilarProducts,
    { data: similarProducts, isLoading: loadingSimilar, isError: similarError },
  ] = useLazyFetchSimilarProductsQuery();

  //If the product has been loaded, then fetch similar products
  useEffect(() => {
    !loadingProduct && fetchSimilarProducts(product?.category || 'all');
  }, [loadingProduct]);

  //Take user comments on that product
  const [comments, loadingComments, commentsError, snapshot] =
    useCollectionData(takeCommentsQuery(db, id!));

  //Handle the comment sending by user
  const handleMessageSend = (value: string) => {
    addDoc(collection(db, 'comments'), {
      comment: value,
      productId: id,
      userId: user?.uid,
      userName: user?.displayName,
      createdAt: serverTimestamp(),
    }).catch((error: FirebaseError) =>
      errorToast(`Error occurred: ${error.code}`),
    );
  };

  //Handle comment deletion
  const handleDelete = (value: string) => {
    console.log('Comment deleted: ', value);
    deleteDoc(doc(db, 'comments', value)).catch((error: FirebaseError) =>
      errorToast(`Error occurred: ${error.code}`),
    );
  };

  //Check if there is loading state
  const loadingDone = !loadingProduct && !loadingComments && !loadingSimilar;

  return (
    <>
      {loadingDone && !productError ? (
        <>
          <div className='back__button flex px-9 pt-6 pb-6'>
            <Link
              to={Routes.Home}
              className='text-slate-500 text-center hover:text-slate-900 transition-all text-2xl flex items-center'>
              <BiChevronLeftCircle />
              <button className='ml-2'> Back</button>
            </Link>
          </div>
          <div className='product__wrapper w-full flex flex-col md:flex-row justify-center items-start p-9 pt-5 pb-0'>
            <ProductMain
              image={product?.image || ''}
              title={product?.title!}
            />
            <ProductDescription {...product!} />
          </div>
          {!similarError && (
            <div className='similar__wrapper w-full p-9 pb-0'>
              <Carousel title={'Similar products'}>
                {similarProducts
                  ?.filter((item) => `${item.id}` !== id)
                  .map((item) => (
                    <SwiperSlide
                      className='p-4 mb-5'
                      key={item.id}>
                      <SimilarProduct
                        image={item.image}
                        rating={item.rating}
                        title={item.title}
                        id={item.id}
                      />
                    </SwiperSlide>
                  ))}
              </Carousel>
            </div>
          )}
          {!commentsError ? (
            <div className='comments__wrapper p-9 pt-4'>
              {user && <CommentsInput callback={handleMessageSend} />}
              {comments?.length ? (
                comments.map((item, i) => (
                  <CommentsBlock
                    author={item.userName}
                    image=''
                    status={
                      item.userName !== 'admin' ? 'Customer' : 'Administrator'
                    }
                    availableDelete={item.userId === user?.uid}
                    deleteCallback={() =>
                      handleDelete(snapshot?.docs[i].id || '')
                    }
                    text={item.comment}
                    key={`${item.userId}${item.comment}`}
                  />
                ))
              ) : (
                <NoComments />
              )}
            </div>
          ) : (
            <GeneralError />
          )}
        </>
      ) : (
        <div className='w-full h-screen flex flex-col md:flex-row justify-center p-9'>
          <Loader />
        </div>
      )}
      {productError && <GeneralError includeButton />}
    </>
  );
};

export default ProductInner;
