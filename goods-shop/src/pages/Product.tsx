import React from 'react';
import { useParams } from 'react-router-dom';

import ProductInner from '../components/ProductInner/ProductInner';
import Layout from '../components/UI/Layout/Layout';

const Product = () => {
  const id = useParams();

  console.log(id);

  return (
    <>
      <Layout
        includeHeader
        includeHeaderSearch={false}>
        <ProductInner />
      </Layout>
    </>
  );
};

export default Product;
