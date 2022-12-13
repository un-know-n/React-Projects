import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCartItem } from '../../../hooks/useCartItem';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { IProduct } from '../../../types/IProduct';
import { addToCart } from '../../../utils/helpers/cart/addToCart';
import { composePrice } from '../../../utils/helpers/product/composePrice';
import { returnStars } from '../../../utils/helpers/UI/returnStars';
import AddToCart from '../../UI/Buttons/AddToCart';
import c from './../../MainItems/Item/Item.module.scss';

const ProductDescription: FC<IProduct> = ({
  description,
  price,
  rating: { count, rate },
  size,
  title,
  category,
  id,
  image,
}) => {
  const dispatch = useAppDispatch();

  //Check if the user is authorized
  const [user] = useUserAuth();

  //Local state of current selected size
  const [selectedSize, setSelectedSize] = useState('');

  //Take the stars from rating object
  const memoizedStars = useMemo(() => returnStars(rate), [rate]);

  //Find item in the cart
  const cartItem = useCartItem(selectedSize, id);

  //Calculate real price of the item
  const realPrice = composePrice(price, selectedSize, size);

  //Change selected size when product initialized
  useEffect(() => {
    setSelectedSize(size ? size[0] : '');
  }, [size]);

  return (
    <>
      <div className='product__description w-full md:ml-7'>
        <h1 className='mt-4 md:mt-0 text-2xl font-normal'>{title}</h1>

        <div className='description__info w-full flex justify-between py-4'>
          <div className='price'>
            <h3 className='text-2xl font-normal'>Price: {realPrice || '-'}$</h3>
          </div>
          <div className='amount'>
            <span className='text-xl'>
              {count || 0} <sub>left</sub>
            </span>
          </div>
        </div>
        <div className='description__sizes flex flex-col sm:flex-row justify-between items-center mb-4'>
          <span className='text-xl font-light'>Available sizes:</span>
          {!size ? (
            'none'
          ) : (
            <div className={`${c.item__selector} mt-3 sm:mt-0 min-w-[200px]`}>
              <ul>
                {size.map((s) => (
                  <li
                    key={s}
                    className={classNames('text-center', {
                      [c.active]: s === selectedSize,
                    })}
                    onClick={() => setSelectedSize(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='main__buttons w-full flex flex-col sm:flex-row justify-between items-center mb-3'>
          <h3>
            <span className='text-2xl font-light'>Rating:</span> {memoizedStars}
          </h3>
          <Link
            to={!user ? Routes.SignIn : ''}
            className='mt-3 sm:mt-0'>
            <AddToCart
              onClickCallback={() =>
                addToCart(dispatch, cartItem, selectedSize, size, {
                  id,
                  title,
                  price,
                  category,
                  image,
                })
              }
              itemCartCounter={cartItem?.count || 0}
            />
          </Link>
        </div>
        <Accordion
          defaultIndex={[0]}
          allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex='1'
                  textAlign='left'
                  className='text-lg font-light'>
                  Description
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {description || 'No description provided'}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default ProductDescription;
