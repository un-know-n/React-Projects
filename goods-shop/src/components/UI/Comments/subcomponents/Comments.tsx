import { CardBody, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

type TProps = {
  text: string;
};

const Comments: FC<TProps> = ({ text }) => {
  return (
    <>
      <CardBody paddingY={0}>
        <Text>{text}</Text>
      </CardBody>
    </>
  );
};

export default Comments;
