//TODO: Redo the following code

export const useSortedPosts = () => {
  const sortedPosts = useMemo(() => {
    if (filter.sort)
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    return posts;
  }, [filter.sort, posts]);
};

export const usePosts = (posts, query, sortType) => {
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedPosts]);
};
