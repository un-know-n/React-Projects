import { Card } from '@chakra-ui/react';
import React, { FC } from 'react';

import Comments from './subcomponents/Comments';
import CommentsHeader from './subcomponents/CommentsHeader';

type TProps = Record<'author' | 'status' | 'image' | 'text', string> &
  TDocument;

export type TDocument = {
  availableDelete?: boolean;
  deleteCallback?: () => void;
};

const CommentsBlock: FC<TProps> = ({
  author,
  image,
  status,
  text,
  availableDelete,
  deleteCallback,
}) => {
  return (
    <>
      <Card className='mt-4'>
        <CommentsHeader
          author={author}
          status={status}
          image={image}
          availableDelete={availableDelete}
          deleteCallback={deleteCallback}
        />
        <Comments text={text} />
      </Card>
    </>
  );
};

export default CommentsBlock;
