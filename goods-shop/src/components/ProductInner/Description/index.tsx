import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

import { IProduct } from '../../../types/IProduct';
import c from './../../MainItems/Item/Item.module.scss';

type TProps = Pick<IProduct, 'description' | 'price' | 'rating' | 'size'> & {
  selectedSize: string;
  setSelectedSize: (value: string) => void;
};

const ProductDescription: FC<TProps> = ({
  description,
  price,
  rating: { count },
  size,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <>
      <div className='product__description w-full md:ml-7'>
        <div className='description__info w-full flex justify-between py-4'>
          <div className='price'>
            <h3 className='text-xl font-light'>Price: {price || '-'}$</h3>
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
