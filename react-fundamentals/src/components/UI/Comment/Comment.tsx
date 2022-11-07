import React, { FC } from 'react';

type Props = {
  title: string;
  body: string;
};

export const Comment: FC<Props> = ({ title, body }) => {
  return (
    <>
      <h2>Author: {title}</h2>
      <p>Description: {body}</p>
    </>
  );
};
