import './PostsList.css';

import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Post, TPostsList } from '../../../shared/types/TPosts';
import { PostItem } from './PostItem/PostItem';

export const PostsList: FC<TPostsList> = ({
  posts,
  title,
  removePost,
  error,
}) => {
  if (error) return <h1>{error}</h1>;

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
        {posts.map((post: Post, index: number) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem
              {...post}
              postNumber={post.id}
              removePost={() => removePost(post.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
