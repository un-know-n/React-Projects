import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/UI/Layout/Layout';

const Product = () => {
  const id = useParams();

  return (
    <>
      <Layout includeHeader>
        <div>Product</div>
      </Layout>
    </>
  );
};

export default Product;
