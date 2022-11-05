import React, { FC } from 'react';

import { TPostProps } from '../../../../types/Posts';
import { MyButton } from '../../../UI/Button/MyButton';

export const PostItem: FC<TPostProps> = ({
  title,
  body,
  postNumber,
  removePost,
}) => {
  return (
    <div>
      <div className="post">
        <div className="post__content">
          <strong>
            {postNumber}. {title}
          </strong>
          <div>{body}</div>
        </div>
        <div className="post__buttons">
          <MyButton onClick={removePost}>Delete</MyButton>
        </div>
      </div>
    </div>
  );
};
