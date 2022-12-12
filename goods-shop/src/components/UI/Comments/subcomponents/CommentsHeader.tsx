import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { FC, MouseEventHandler, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteSweep } from 'react-icons/md';
import { TbMessageReport } from 'react-icons/tb';

import { TDocument } from '..';
import { infoToast, successToast } from '../../../../utils/helpers/toasts';

type TProps = {
  author: string;
  image: string;
  status: string;
} & TDocument;

const CommentsHeader: FC<TProps> = ({
  author,
  image,
  status,
  availableDelete,
  deleteCallback,
}) => {
  const [wasClick, setWasClick] = useState(false);
  const handleReport = (e: MouseEvent) => {
    if (!wasClick) {
      successToast(
        `Comment of ${author} was sent for review, we will contact you when verification is over 😊`,
        true,
      );
      setWasClick(true);
    } else infoToast('You have already reported that comment', true);
  };

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

          <Popover isLazy>
            <PopoverTrigger>
              <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
                icon={<BsThreeDotsVertical />}
                // eslint-disable-next-line react/no-children-prop
                children='Click'
              />
            </PopoverTrigger>
            <PopoverContent
              width={'100%'}
              bg='white'
              color='black'
              border={'1px solid gray'}
              display={'flex'}
              flexWrap={'wrap'}
              overflow={'hidden'}
              borderRadius={'10'}>
              {availableDelete && (
                <PopoverHeader
                  fontWeight='semibold'
                  padding={0}>
                  <Button
                    colorScheme='red'
                    variant='ghost'
                    borderRadius={'none'}
                    onClick={() => (deleteCallback ? deleteCallback() : '')}>
                    <MdDeleteSweep />{' '}
                    <span className='ml-2'>Delete comment</span>
                  </Button>
                </PopoverHeader>
              )}
              <PopoverBody
                fontWeight='semibold'
                padding={0}>
                <Button
                  colorScheme='gray'
                  variant='ghost'
                  borderRadius={'none'}
                  onClick={
                    handleReport as unknown as MouseEventHandler<HTMLButtonElement>
                  }>
                  <TbMessageReport />{' '}
                  <span className='ml-2'>Report comment</span>
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </CardHeader>
    </>
  );
};

//TODO: Fix the problem with onClick type in Button component props

export default CommentsHeader;
