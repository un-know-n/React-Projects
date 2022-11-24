import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useDebounce = (callback: any, delay: number) => {
  //Variable to store the timer id
  const timer = useRef<any>(null);

  //Take the link of the function, depending on callback and delay
  const debouncedCallback = useCallback(
    (...args: any) => {
      //If the timer has already been initialized -> clear it
      if (timer.current) clearTimeout(timer.current);

      //Create new timer
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};

//TODO: Fix the any type to something more appropriate!
