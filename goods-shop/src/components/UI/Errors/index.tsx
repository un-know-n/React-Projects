import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import dataErrorImg from '../../../assets/images/dataError.webp';
import { Routes } from '../../../routes';

type TProps = {
  includeButton?: boolean;
};

const GeneralError: FC<TProps> = ({ includeButton = false }) => {
  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <div className='flex flex-col justify-center items-center py-9 max-w-md text-center'>
          <h2 className='mb-4 mt-7 text-3xl font-medium'>
            Unexpected error ❌
          </h2>
          <p className='text-lg'>
            Sorry, there was an error during fetching data from the server.
            Please, try again later 🔄
          </p>
          <img
            src={dataErrorImg}
            alt='Error during fetching products'
            className='max-w-[180px]'
          />
          {includeButton && (
            <Link
              to={Routes.Home}
              className='button button--black w-fit'>
              <span>Back</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralError;
