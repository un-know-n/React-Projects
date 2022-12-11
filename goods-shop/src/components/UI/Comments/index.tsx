import { Card } from '@chakra-ui/react';
import React, { FC } from 'react';

import Comments from './subcomponents/Comments';
import CommentsFooter from './subcomponents/CommentsFooter';
import CommentsHeader from './subcomponents/CommentsHeader';

type TProps = Record<'author' | 'status' | 'image' | 'text', string>;

const CommentsBlock: FC<TProps> = ({ author, image, status, text }) => {
  return (
    <>
      <Card className='mt-4'>
        <CommentsHeader
          author='Segun Adebayo'
          status='Creator, Chakra UI'
          image='https://bit.ly/sage-adebayo'
        />
        <Comments
          text='With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.'
        />
        <CommentsFooter />
      </Card>
    </>
  );
};

export default CommentsBlock;
