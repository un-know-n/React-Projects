import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export const ItemsSkeleton = (props?: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={370}
      height={455}
      viewBox='0 0 370 455'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}>
      <rect
        x='0'
        y='0'
        rx='14'
        ry='14'
        width='360'
        height='245'
      />
      <rect
        x='0'
        y='250'
        rx='6'
        ry='6'
        width='360'
        height='31'
      />
      <rect
        x='0'
        y='290'
        rx='7'
        ry='7'
        width='360'
        height='100'
      />
      <rect
        x='0'
        y='411'
        rx='5'
        ry='5'
        width='108'
        height='35'
      />
      <rect
        x='245'
        y='405'
        rx='25'
        ry='25'
        width='113'
        height='47'
      />
    </ContentLoader>
  );
};
