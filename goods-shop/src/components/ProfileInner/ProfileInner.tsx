import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuthContext } from '../../hooks/useAuthContext';
import GeneralError from '../UI/Errors';
import Loader from '../UI/Loader/Loader';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import c from './ProfileInner.module.scss';
import ProfilePreferences from './ProfilePreferences/ProfilePreferences';

const ProfileInner = () => {
  const { auth } = useAuthContext();
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <div className={c.profile}>
        {loading && !error ? (
          <Loader />
        ) : (
          <>
            <ProfileInfo user={user!} />
            <ProfilePreferences />
          </>
        )}
        {error && <GeneralError />}
      </div>
    </>
  );
};

export default ProfileInner;
