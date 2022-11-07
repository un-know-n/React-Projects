import { useEffect, useRef } from 'react';

export const useObserver = (
  ref: React.RefObject<any>,
  callback: () => void,
  canLoad: boolean
) => {
  const observer = useRef<any>();
  useEffect(() => {
    const observerCallback = (entries: any, observer: any) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(observerCallback);
    observer.current.observe(ref.current);
    return () => {
      observer.current.disconnect();
    };
  }, []);
};
