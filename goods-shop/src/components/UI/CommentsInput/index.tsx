import { Avatar, Button, Flex, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';

const CommentsInput = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Flex
        flex='1'
        gap='4'
        alignItems='baseline'
        className='flex flex-col sm:flex-row'>
        <Avatar
          name='Somename'
          src='img'
        />

        <Textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.currentTarget.value)
          }
          placeholder='Type your thoughts here...'
          className='resize-y'
          size='lg'
          focusBorderColor='green.500'
        />
        <Button colorScheme='green'>Send</Button>
      </Flex>
    </>
  );
};

export default CommentsInput;
