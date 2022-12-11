import { Card } from '@chakra-ui/react';
import React, { FC } from 'react';

import Comments from './subcomponents/Comments';
import CommentsHeader from './subcomponents/CommentsHeader';

type TProps = Record<'author' | 'status' | 'image' | 'text', string>;

const CommentsBlock: FC<TProps> = ({ author, image, status, text }) => {
  return (
    <>
      <Card className='mt-4'>
        <CommentsHeader
          author={author}
          status={status}
          image={image}
        />
        <Comments text={text} />
      </Card>
    </>
  );
};

export default CommentsBlock;
