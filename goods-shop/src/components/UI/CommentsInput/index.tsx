import { Avatar, Button, Flex, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent, FC, useState } from 'react';

import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { takeUser } from '../../../store/selectors/user.selector';

type TProps = {
  callback: (value: string) => void;
};

const CommentsInput: FC<TProps> = ({ callback }) => {
  const user = useTypedSelector(takeUser);
  const [value, setValue] = useState('');

  const handleClick = () => {
    callback(value);
    setValue('');
  };

  return (
    <>
      <Flex
        flex='1'
        gap='4'
        alignItems='baseline'
        className='flex flex-col sm:flex-row'>
        <Avatar
          name={user.username!}
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
        <Button
          colorScheme='green'
          onClick={handleClick}>
          Send
        </Button>
      </Flex>
    </>
  );
};

export default CommentsInput;
