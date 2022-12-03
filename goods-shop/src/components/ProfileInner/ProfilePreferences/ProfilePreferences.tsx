import React from 'react';
import { FiSettings } from 'react-icons/fi';

import { useAuthContext } from '../../../hooks/useAuthContext';
import PersonalItem from './PersonalItem';
import c from './ProfilePreferences.module.scss';
import RestItem from './RestItem';

const ProfilePreferences = () => {
  const { auth } = useAuthContext();

  const personalList = [
    { title: 'Name', inner: auth.currentUser?.displayName },
    { title: 'Email', inner: auth.currentUser?.email },
    { title: 'Phone number', inner: auth.currentUser?.photoURL },
    { title: 'Photo url', inner: auth.currentUser?.phoneNumber },
  ];

  const restList = [
    { title: 'Settings', icon: FiSettings, additional: null },
    { title: 'Orders', icon: null, additional: 5 },
    { title: 'Delivery address', icon: null, additional: 'Mountain view' },
  ];

  return (
    <>
      <div className={c.profile__preferences}>
        <div className={c.preferences__personal}>
          {personalList.map((item) => (
            <PersonalItem
              key={item.title}
              title={item.title}
              inner={item.inner}
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
      </div>
    </>
  );
};

export default ProfilePreferences;
