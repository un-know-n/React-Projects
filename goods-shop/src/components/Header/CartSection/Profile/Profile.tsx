import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useUserAuth } from '../../../../hooks/useUserAuth';
import { Routes } from '../../../../routes';
import c from './Profile.module.scss';

const Profile: FC = () => {
  const [user] = useUserAuth();

  return (
    <>
      <Link to={user ? Routes.Profile : Routes.SignIn}>
        <div className={c.user}>
          <svg
            className={c.user__icon}
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z' />
            <path d='M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z' />
          </svg>
        </div>
      </Link>
    </>
  );
};

export default Profile;
