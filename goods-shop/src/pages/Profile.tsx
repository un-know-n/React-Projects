import React from 'react';

import ProfileInner from '../components/ProfileInner/ProfileInner';
import Layout from '../components/UI/Layout/Layout';

const Profile = () => {
  return (
    <>
      <Layout
        includeHeader
        includeHeaderSearch={false}>
        <ProfileInner />
      </Layout>
    </>
  );
};

export default Profile;
