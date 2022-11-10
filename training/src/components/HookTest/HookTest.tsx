import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { useDebounce } from '../../hooks/useDebounce';

type Props = {};

export const HookTest = (props: Props) => {
  //const username = useInput('');
  //const password = useInput('');

  //const divRef = useRef<any>();

  //const isHovering = useHover(divRef);

  // const [page, setPage] = useState(1);
  // const [posts, setPosts] = useState([] as any);

  // const parentRef = useRef<any>();
  // const childRef = useRef<any>();

  //useScroll(parentRef, childRef, () => fetchPosts(10, page));

  // function fetchPosts(limit: number = 10, page: number = 1) {
  //   fetch(
  //     `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setPosts((prev: any) => [...prev, ...res]);
  //       setPage((actual) => actual + 1);
  //     });
  // }

  const [value, setValue] = useState('');

  const debounceFunc = useDebounce(() => fetchTodos(value), 1000);

  function fetchTodos(query: string = '') {
    fetch(`https://jsonplaceholder.typicode.com/todos?query=${query}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    debounceFunc(e.currentTarget.value);
  };

  // useEffect(() => {
  //   fetchPosts(10, page);
  //   return () => {
  //     setPosts([]);
  //   };
  // }, []);

  return (
    <>
      <div>
        {/* <input {...username} type="text" />
        <input {...password} type="password" /> */}
        {/* <div
          ref={divRef}
          style={{
            width: 100,
            height: 100,
            background: isHovering ? 'green' : 'red',
          }}
        ></div> */}
        {/* <div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
          {posts !== null &&
            posts.map((post: any) => (
              <div
                key={post.id}
                style={{ padding: 20, border: '1px solid red' }}
              >
                <p>{post.title}</p>
              </div>
            ))}
          <div
            ref={childRef}
            style={{ height: 20, width: '100%', background: 'red' }}
          ></div>
        </div> */}
        <input type="text" value={value} onChange={onChange} />
      </div>
    </>
  );
};
