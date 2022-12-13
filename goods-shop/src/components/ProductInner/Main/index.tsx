import { Image } from '@chakra-ui/react';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useCartItem } from '../../../hooks/useCartItem';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { IProduct, IProductRating } from '../../../types/IProduct';
import { addToCart } from '../../../utils/helpers/cart/addToCart';
import { composePrice } from '../../../utils/helpers/product/composePrice';
import { returnStars } from '../../../utils/helpers/UI/returnStars';
import AddToCart from '../../UI/Buttons/AddToCart';

type TProps = Pick<IProduct, 'image' | 'title'>;

const ProductMain: FC<TProps> = ({ image, title }) => {
  return (
    <>
      <div className='product__main flex flex-col items-center justify-center'>
        <div className='main__image w-full sm:w-2/3 md:w-full md:max-w-xs shadow-[0_0_10px_3px_rgba(0,0,0,0.3)] shadow-slate-300 rounded-xl p-3'>
          <Image
            src={image}
            alt={title}
          />
        </div>
      </div>
    </>
  );
};

ProductMain.displayName = 'ProductMain';

export default ProductMain;
