import { Button, CardFooter } from '@chakra-ui/react';
import React from 'react';
import { BiChat, BiLike } from 'react-icons/bi';

const CommentsFooter = () => {
  return (
    <>
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}>
        <Button
          flex='1'
          variant='ghost'
          leftIcon={<BiLike />}>
          Like
        </Button>
        <Button
          flex='1'
          variant='ghost'
          leftIcon={<BiChat />}>
          Comment
        </Button>
      </CardFooter>
    </>
  );
};

export default CommentsFooter;
