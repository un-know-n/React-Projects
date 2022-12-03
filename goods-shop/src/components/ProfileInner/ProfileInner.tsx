import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import c from './ProfileInner.module.scss';
import ProfilePreferences from './ProfilePreferences/ProfilePreferences';

const ProfileInner = () => {
  return (
    <>
      <div className={c.profile}>
        <ProfileInfo />
        <ProfilePreferences />
      </div>
    </>
  );
};

export default ProfileInner;
