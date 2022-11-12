import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AnotherComponent } from '../AnotherComponent/AnotherComponent';
import cl from './TestComponent.module.scss';

type Props = {};

export const TestComponent = (props: Props) => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const ulRef = useRef<any>();
  const numbersRef = useRef<any>();
  const timer = useRef<any>();

  numbersRef.current = numbers;

  const addNumbers = () => {
    setNumbers((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  const scrollHandler = useCallback(() => {
    console.log('Click happened', numbersRef.current);
  }, [numbers]);

  useEffect(() => {
    //console.log(ulRef);
    ulRef.current.addEventListener('click', scrollHandler);
    return () => {
      ulRef.current.removeEventListener('click', scrollHandler);
    };
  }, []);

  const start = () => {
    timer.current = setInterval(addNumbers, 1000);
  };

  const stop = () => {
    clearInterval(timer.current);
  };

  const customInputRef = useRef<any>();

  useEffect(() => {
    console.log(customInputRef.current);
    customInputRef.current.focus();
  }, []);

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.innerDiv}>
        <ul ref={ulRef}>
          {numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </div>

      <AnotherComponent ref={customInputRef} />

      <button onClick={addNumbers}>Add number</button>
      <button onClick={start}>Start timer</button>
      <button onClick={stop}>Stop timer</button>
    </div>
  );
};
