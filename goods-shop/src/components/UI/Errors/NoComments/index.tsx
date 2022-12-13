import React from 'react';

import c from './../../NoData/NoData.module.scss';

const NoComments = () => {
  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <div className='flex flex-col justify-center items-center max-w-md text-center'>
          <h2 className='mb-4 mt-7 text-3xl font-medium'>
            No comments here yet...
          </h2>
          <p className='text-lg'>
            There is no comments on this product, be the first one to tell your
            opinion 😄
          </p>
        </div>
      </div>
    </>
  );
};

export default NoComments;
