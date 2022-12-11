import { Avatar, Box, CardHeader, Flex, Heading, IconButton, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

type TProps = {
  author: string;
  image: string;
  status: string;
};

const CommentsHeader: FC<TProps> = ({ author, image, status }) => {
  return (
    <>
      <CardHeader>
        <Flex>
          <Flex
            flex='1'
            gap='4'
            alignItems='center'
            flexWrap='wrap'>
            <Avatar
              name={author}
              src={image}
            />

            <Box>
              <Heading size='sm'>{author}</Heading>
              <Text>{status}</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
    </>
  );
};

export default CommentsHeader;
