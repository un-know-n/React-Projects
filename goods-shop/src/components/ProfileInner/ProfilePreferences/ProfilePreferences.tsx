import { FirebaseError } from 'firebase/app';
import { Auth } from 'firebase/auth';
import React from 'react';
import { useUpdateEmail, useUpdateProfile } from 'react-firebase-hooks/auth';
import { FiSettings } from 'react-icons/fi';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { errorToast, successToast } from '../../../utils/helpers/toasts';
import Loader from '../../UI/Loader/Loader';
import PersonalItem from './PersonalItem';
import c from './ProfilePreferences.module.scss';
import RestItem from './RestItem';

const ProfilePreferences = () => {
  const { auth } = useAuthContext();

  const [updateName, updatingName, errorName] = useUpdateProfile(auth);
  const [updateUserEmail, updatingEmail, errorEmail] = useUpdateEmail(auth);

  const personalList = [
    {
      title: 'Name',
      inner: auth.currentUser?.displayName,
      callback: (value: string) => updateName({ displayName: value }),
      error: errorName,
    },
    {
      title: 'Email',
      inner: auth.currentUser?.email,
      callback: (value: string) => updateUserEmail(value),
      error: errorEmail,
    },
  ];

  const restList = [
    { title: 'Settings', icon: FiSettings, additional: null },
    { title: 'Orders', icon: null, additional: 5 },
    { title: 'Delivery address', icon: null, additional: 'Mountain view' },
  ];

  return (
    <>
      <div className={c.profile__preferences}>
        {updatingEmail || updatingName ? (
          <div className='h-screen flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            <div className={c.preferences__personal}>
              {personalList.map((item) => (
                <PersonalItem
                  key={item.title}
                  title={item.title}
                  inner={item.inner}
                  callback={async (value: string) => {
                    const success = await item.callback(value);
                    success
                      ? successToast('Field updated successfully!')
                      : errorToast(`Error occurred: ${item.error}`);
                  }}
                />
              ))}
            </div>
            <div className={c.preferences__rest}>
              <ul className={c.rest__list}>
                {restList.map((item) => (
                  <RestItem
                    key={item.title}
                    additional={item.additional}
                    title={item.title}
                    outerIcon={item.icon ? <item.icon /> : null}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePreferences;
