import React from 'react';

import ProductInner from '../components/ProductInner/ProductInner';
import Layout from '../components/UI/Layout/Layout';

const Product = () => {
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
