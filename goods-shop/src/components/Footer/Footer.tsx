import React from 'react';

import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { takePage } from '../../store/selectors/filter.selector';
import { Pagination } from '../UI/Pagination/Pagination';

const Footer = () => {
  const page = useTypedSelector(takePage);

  return (
    <>
      <Pagination
        forcePage={page}
        className='flex w-full justify-center items-center'
        pageCount={3}
      />
    </>
  );
};

export default Footer;
