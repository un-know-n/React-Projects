import React, { useState } from 'react';

import { HTMLElementEvent } from '../../../shared/types/TEvent';
import { Post } from '../../../shared/types/TPosts';
import { MyButton } from '../../UI/Button/MyButton';
import { MyInput } from '../../UI/Input/MyInput';

export const PostForm = ({
  createPost,
}: {
  createPost: (post: Post) => void;
}) => {
  const defaultPostValues = { title: '', body: '' };
  const [post, setPost] = useState(defaultPostValues);

  const addNewPost = (e: HTMLElementEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = { id: Date.now(), ...post };
    createPost(newPost);
    setPost(defaultPostValues);
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e: HTMLElementEvent<HTMLInputElement>) =>
          setPost({ ...post, title: e.currentTarget.value })
        }
        type="text"
        placeholder="Post title"
      />
      <MyInput
        value={post.body}
        onChange={(e: HTMLElementEvent<HTMLInputElement>) =>
          setPost({ ...post, body: e.currentTarget.value })
        }
        type="text"
        placeholder="Post description"
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
};
