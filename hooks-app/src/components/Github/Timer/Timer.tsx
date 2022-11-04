import { FC, useEffect, useState } from 'react';

import { TProps } from '../Details/GithubDetails';

export const Timer: FC<TProps> = ({ userDetails, setUserDetails }) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setSeconds((actual) => actual - 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    if (seconds < 1) {
      setUserDetails(null);
    }
  }, [seconds]);

  useEffect(() => {
    setSeconds(10);
  }, [userDetails]);

  return (
    <>
      <div>{seconds}</div>
    </>
  );
};
