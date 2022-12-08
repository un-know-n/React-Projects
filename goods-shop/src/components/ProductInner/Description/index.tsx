import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React, { FC } from 'react';

import { IProduct } from '../../../types/IProduct';

type TProps = Pick<IProduct, 'description' | 'price' | 'rating'>;

const ProductDescription: FC<TProps> = ({
  description,
  price,
  rating: { count },
}) => {
  return (
    <>
      <div className='product__description w-full ml-7'>
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
        <Accordion
          defaultIndex={[0]}
          allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  flex='1'
                  textAlign='left'>
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
