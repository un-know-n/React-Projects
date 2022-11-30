import React from 'react';

import { Filter } from '../components/Filter/Filter';
import Footer from '../components/Footer/Footer';
import { Items } from '../components/MainItems/Items';
import Layout from '../components/UI/Layout/Layout';

const Main = () => {
  return (
    <>
      <Layout includeHeader>
        <div className='content'>
          <div className='container'>
            <Filter />
            <Items />
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Main;
