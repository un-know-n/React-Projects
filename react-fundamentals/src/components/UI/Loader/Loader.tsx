import React, { FC } from 'react';

import cl from './Loader.module.css';

export const Loader: FC = () => {
  return (
    <>
      <div className={cl.loaderWrapper}>
        <div className={cl.loader}></div>
      </div>
    </>
  );
};
