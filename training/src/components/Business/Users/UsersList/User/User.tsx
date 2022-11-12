import React, { FC } from 'react';

import { IUser } from '../../../../../types/IUsers';

export const User: FC<IUser> = ({ id, name, username, email }) => {
  return (
    <>
      <div>
        <h3>
          {id}. {name}
        </h3>
        <b>{username}</b>
        <p>{email}</p>
      </div>
    </>
  );
};
