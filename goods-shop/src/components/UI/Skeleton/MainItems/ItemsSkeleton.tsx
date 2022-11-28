import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export const ItemsSkeleton = (props?: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={370}
      height={450}
      viewBox='0 0 370 455'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      className='mb-7'
      {...props}>
      <rect
        x='0'
        y='0'
        rx='14'
        ry='14'
        width='360'
        height='240'
      />
      <rect
        x='0'
        y='252'
        rx='6'
        ry='6'
        width='360'
        height='28'
      />
      <rect
        x='0'
        y='292'
        rx='7'
        ry='7'
        width='360'
        height='95'
      />
      <rect
        x='0'
        y='407'
        rx='5'
        ry='5'
        width='108'
        height='46'
      />
      <rect
        x='245'
        y='407'
        rx='25'
        ry='25'
        width='113'
        height='46'
      />
    </ContentLoader>
  );
};
