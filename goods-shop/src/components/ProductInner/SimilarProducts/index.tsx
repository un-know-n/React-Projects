import { Card, CardBody, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { IProduct } from '../../../types/IProduct';
import { returnStars } from '../../../utils/helpers/UI/returnStars';

type TProps = Pick<IProduct, 'title' | 'image' | 'rating' | 'id'>;

const SimilarProduct: FC<TProps> = ({
  image,
  rating: { count, rate },
  title,
  id,
}) => {
  const memoizedStars = useMemo(() => returnStars(rate), [rate]);

  return (
    <>
      <Card maxW='sm'>
        <CardBody className='text-center shadow-xl'>
          <Image
            src={image}
            alt={title}
            borderRadius='lg'
            maxHeight={'150px'}
            margin={'auto'}
          />
          <Stack
            mt='6'
            spacing='3'>
            <Link to={`/product/${id}`}>
              <Heading
                size='md'
                textAlign={'left'}
                className={'truncate'}>
                {title}
              </Heading>
            </Link>

            <Divider />
            <Text>{memoizedStars}</Text>
            <Text
              color='blue.600'
              fontSize='2xl'>
              {count || 0} <sub>left</sub>
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default SimilarProduct;
