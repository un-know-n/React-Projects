import './PostsList.css';

import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TPostsList } from '../../../types/Posts';
import { PostItem } from './PostItem/PostItem';

export const PostsList: FC<TPostsList> = ({ posts, title, removePost }) => {
  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center', marginTop: '15px' }}>
        There is no posts yet... But you can fix it
      </h1>
    );
  }

  return (
    <div>
      {title && <h1 style={{ textAlign: 'center' }}>{title}</h1>}
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem
              {...post}
              postNumber={index + 1}
              removePost={() => removePost(post.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
