import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import { db } from '../../api/firebase.api';
import { useFetchProductByIdQuery, useLazyFetchSimilarProductsQuery } from '../../api/products.api';
import { useUserAuth } from '../../hooks/useUserAuth';
import { takeCommentsQuery } from '../../utils/helpers/user/takeCommentsQuery';
import Carousel from '../UI/Carousel';
import CommentsBlock from '../UI/Comments';
import CommentsInput from '../UI/CommentsInput';
import Loader from '../UI/Loader/Loader';
import ProductDescription from './Description';
import ProductMain from './Main';
import SimilarProduct from './SimilarProducts';
import SimilarProducts from './SimilarProducts';

const ProductInner = () => {
  const { id } = useParams();

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
    });
    //
  };

  //Handle comment deletion
  const handleDelete = (value: string) => {
    console.log('Comment deleted: ', value);
    deleteDoc(doc(db, 'comments', value))
      .then(() => console.log('Document deleted'))
      .catch((error: FirebaseError) => console.log(error.code));
  };

  //Check if there is loading or error state
  const loadingDone = !loadingProduct && !loadingComments && !loadingSimilar;
  const noErrors = !productError && !commentsError && !similarError;

  //Local state of current selected size
  const [selectedSize, setSelectedSize] = useState('');

  //Change selected size when product initialized
  useEffect(() => {
    setSelectedSize(product?.size ? product.size[0] : '');
  }, [product?.size]);

  //console.log(similarProducts);

  return (
    <>
      {loadingDone && noErrors ? (
        <>
          <div className='product__wrapper w-full flex flex-col md:flex-row justify-center p-9'>
            <ProductMain
              selectedSize={selectedSize}
              image={product?.image || ''}
              category={product?.category!}
              id={product?.id!}
              title={product?.title!}
              price={product?.price!}
              rating={product?.rating || { rate: 5, count: 0 }}
              size={product?.size}
            />
            <ProductDescription
              title={product?.title!}
              selectedSize={selectedSize!}
              setSelectedSize={(s) => setSelectedSize(s)}
              size={product?.size}
              description={product?.description || ''}
              price={product?.price || 0}
              rating={product?.rating || { rate: 5, count: 0 }}
            />
          </div>
          <div className='similar__wrapper w-full p-9'>
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
          <div className='comments__wrapper p-9'>
            {user && <CommentsInput callback={handleMessageSend} />}
            {comments &&
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
