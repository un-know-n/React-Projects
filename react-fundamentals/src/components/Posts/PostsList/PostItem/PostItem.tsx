import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '../../../../shared/types/TPosts';
import { MyButton } from '../../../UI/Button/MyButton';
import cl from './PostItem.module.css';

type Props = {
  postNumber: number;
  removePost: (id: number) => void;
};

export const PostItem: FC<Post & Props> = ({
  id,
  title,
  body,
  postNumber,
  removePost,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={cl.post}>
        <div className={cl.post__content}>
          <strong>
            {postNumber}. {title}
          </strong>
          <div>{body}</div>
        </div>
        <div className={cl.post__buttons}>
          <MyButton onClick={() => navigate(`/posts/${id}`)}>Open</MyButton>
          <MyButton onClick={removePost}>Delete</MyButton>
        </div>
      </div>
    </div>
  );
};
