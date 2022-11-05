import React, { useState } from 'react';

import { MyButton } from '../../UI/Button/MyButton';
import { MyInput } from '../../UI/Input/MyInput';

export const PostForm = ({ createPost }) => {
  const defaultPostValues = { title: '', body: '' };
  const [post, setPost] = useState(defaultPostValues);

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), ...post };
    createPost(newPost);
    setPost(defaultPostValues);
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.currentTarget.value })}
        type="text"
        placeholder="Post title"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.currentTarget.value })}
        type="text"
        placeholder="Post description"
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
};
