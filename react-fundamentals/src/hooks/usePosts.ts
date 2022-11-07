import { useMemo } from 'react';

import { Post } from '../shared/types/TPosts';

export const useSortedPosts = (posts: Post[], sortType: any) => {
  const sortedPosts = useMemo(() => {
    if (sortType)
      //@ts-ignore
      return [...posts].sort((a, b) => a[sortType].localeCompare(b[sortType]));
    return posts;
  }, [sortType, posts]);
  return sortedPosts;
};

export const usePosts = (posts: Post[], query: string, sortType: any) => {
  const sortedPosts = useSortedPosts(posts, sortType);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};

//TODO: Solve the "ts-ignore" problem
