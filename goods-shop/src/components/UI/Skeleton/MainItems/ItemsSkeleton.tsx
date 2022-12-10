import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export const ItemsSkeleton = (props?: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={370}
      height={500}
      viewBox='0 0 370 500'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      className='mb-7'
      style={{ width: '100%', height: '100%' }}
      {...props}>
      <rect
        x='0'
        y='0'
        rx='14'
        ry='14'
        width='360'
        height='280'
      />
      <rect
        x='0'
        y='292'
        rx='6'
        ry='6'
        width='360'
        height='28'
      />
      <rect
        x='0'
        y='332'
        rx='7'
        ry='7'
        width='360'
        height='95'
      />
      <rect
        x='0'
        y='447'
        rx='5'
        ry='5'
        width='108'
        height='46'
      />
      <rect
        x='245'
        y='447'
        rx='25'
        ry='25'
        width='113'
        height='46'
      />
    </ContentLoader>
  );
};
