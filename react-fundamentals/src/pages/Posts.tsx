import React, { useEffect, useMemo, useRef, useState } from 'react';

import PostService from '../api/PostService';
import { PostFilter } from '../components/Posts/PostFilter/PostFilter';
import { PostForm } from '../components/Posts/PostForm/PostForm';
import { PostsList } from '../components/Posts/PostsList/PostsList';
import { MyButton } from '../components/UI/Button/MyButton';
import { Loader } from '../components/UI/Loader/Loader';
import { MyModal } from '../components/UI/Modal/MyModal';
import { Pagination } from '../components/UI/Pagination/Pagination';
import { MySelect } from '../components/UI/Select/MySelect';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import { Filter } from '../shared/types/TFilter';
import { Post } from '../shared/types/TPosts';

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Filter>({ sort: '', query: '' });
  const [modal, setModal] = useState<boolean>(false);

  const [totalPages, setTotalPages] = useState<number | undefined>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const lastElement = useRef<any>();

  const [fetchPosts, isLoadingPosts, error] = useFetching(async () => {
    const response = await PostService.getSpecific(limit, page);
    const totalPages = Number(response.headers['x-total-count']);
    setTotalPages(totalPages);
    setPosts([...posts, ...response.data]); //response.data
  });

  const createPost = (post: Post) => {
    setPosts([...posts, post]);
    setModal(false);
  };

  const removePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  useObserver(lastElement, () => setPage((actual) => actual + 1), true);

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
      <MySelect
        value={limit}
        defaultValue="Amount of elements on the page"
        onChange={(value: number) => setLimit(value)}
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'All' },
        ]}
      />
      <PostsList
        removePost={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts App"
        error={error}
      />
      <div ref={lastElement} style={{ height: 5, background: 'gray' }} />
      {isLoadingPosts && <Loader />}
      {totalPages && (
        <Pagination
          currentPage={page}
          limit={limit}
          setPage={setPage}
          totalCount={totalPages}
        />
      )}
    </div>
  );
};
