import React from 'react';

import c from './Loader.module.scss';

const Loader = () => {
  return (
    <>
      <div className={c.loaderWrapper}>
        <div className={c.loader}></div>
      </div>
    </>
  );
};

export default Loader;
