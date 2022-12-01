import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/UI/Layout/Layout';
import { Routes } from '../routes';
import notFoundImg from './../assets/images/not-found-page.png';

const ErrorPage = () => {
  return (
    <>
      <Layout>
        <div className='content'>
          <div className='container flex flex-col justify-center items-center'>
            <h2 className='mb-3'>Page not found 📄</h2>
            <p>
              Sorry, but we can&apos;t find page you&apos;re looking for... 😔
            </p>
            <img
              src={notFoundImg}
              alt='Empty cart'
            />
            <Link
              to={Routes.Home}
              className='button button--black'>
              <span>Back</span>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ErrorPage;
