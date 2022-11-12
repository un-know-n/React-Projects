import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTypedDispatch } from '../../../../store/hooks/useTypedDispatch';
import { takeUsers } from '../../../../store/selectors/userSelectors';
import { fetchUsersT } from '../../../../store/thunk/userThunk';
import { User } from './User/User';

export const UsersList: FC = () => {
  const { loading, error, users } = useSelector(takeUsers);

  const dispatch = useTypedDispatch();

  //*The way to get rid of dispatch(just for test)
  //const { fetchUsersT } = useThunk();

  useEffect(() => {
    dispatch(fetchUsersT());
    //fetchUsersT();
  }, []);

  if (loading) return <div>Wait for a moment, downloading info...</div>;

  if (error) return <div>Sorry, there is error during data fetching</div>;

  return (
    <>
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </>
  );
};
