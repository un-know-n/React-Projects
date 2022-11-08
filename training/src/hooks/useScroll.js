import { memo, useEffect, useRef } from 'react';

export const useScroll = (parentRef, childRef, callback) => {
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log('intersection happened');
        callback();
      }
    }, options);

    observer.current.observe(childRef.current);

    return () => {
      observer.current.disconnect();
    };
  }, [callback]);
};
