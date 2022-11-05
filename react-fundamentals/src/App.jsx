import './assets/styles/App.css';

import axios from 'axios';
import React, { useMemo, useRef, useState } from 'react';

import { PostFilter } from './components/Posts/PostFilter/PostFilter';
import { PostForm } from './components/Posts/PostForm/PostForm';
import { PostsList } from './components/Posts/PostsList/PostsList';
import { MyButton } from './components/UI/Button/MyButton';
import { MyModal } from './components/UI/Modal/MyModal';
import { usePosts } from './hooks/usePosts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  //const [fetchPosts, isLoadingPosts, error] = useFetchiad;

  //TODO: load posts from server, via loader and custom hooks, also using useEffect hook(example is above), moreover you need to handle errors and show them to user

  const createPost = (post) => {
    setPosts([...posts, post]);
    setModal(false);
  };

  const removePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const fetchPosts = async () => {
    const response = await axios.get();
  };

  const sortedAndSearchedPosts = usePosts(posts, filter.query, filter.sort);

  return (
    <div className="App">
      <MyButton style={{ margin: '30px 0 0 0' }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      <PostsList
        removePost={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts App"
      />
    </div>
  );
};

export default App;
