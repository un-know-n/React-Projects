import './assets/styles/App.css';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import PostService from './api/PostService';
import { PostFilter } from './components/Posts/PostFilter/PostFilter';
import { PostForm } from './components/Posts/PostForm/PostForm';
import { PostsList } from './components/Posts/PostsList/PostsList';
import { MyButton } from './components/UI/Button/MyButton';
import { Loader } from './components/UI/Loader/Loader';
import { MyModal } from './components/UI/Modal/MyModal';
import { useFetching } from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';
import { getPagesArray, getTotalCount } from './utils/pages';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const pagesArray = getPagesArray(getTotalCount(totalPages, limit));
  const [fetchPosts, isLoadingPosts, error] = useFetching(async () => {
    const response = await PostService.getSpecific(limit, page);
    setTotalPages(response.headers['x-total-count']);
    setPosts(response.data);
  });

  const createPost = (post) => {
    setPosts([...posts, post]);
    setModal(false);
  };

  const removePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    console.log(pagesArray);
  }, [totalPages]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

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
      {isLoadingPosts ? (
        <Loader />
      ) : (
        <PostsList
          removePost={removePost}
          posts={sortedAndSearchedPosts}
          title="Posts App"
          error={error}
        />
      )}
      {pagesArray && (
        <div className="page__wrapper">
          {pagesArray.map((p) => (
            <div
              key={p}
              className={p === page ? 'page page__current' : 'page'}
              onClick={() => setPage(p)}
            >
              {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
