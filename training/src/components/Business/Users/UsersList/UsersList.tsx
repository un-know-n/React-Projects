import React, { FC, useEffect } from 'react';

import { usersAPI } from '../../../../api/usersAPI';
import { useTypedDispatch } from '../../../../store/hooks/useTypedDispatch';
import { fetchUsersAsyncT } from '../../../../store/thunk/userThunk';
import { IUser } from '../../../../types/IUsers';
import { User } from './User/User';

export const UsersList: FC = () => {
  const {
    data: users,
    isError: error,
    isLoading: loading,
  } = usersAPI.useFetchAllUsersQuery(10);
  const [createUser, {}] = usersAPI.useCreateUserMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createUser({ name: title, email: title, username: title } as IUser);
  };

  //const { loading, error, users } = useSelector(takeUsers);

  const dispatch = useTypedDispatch();

  //*The way to get rid of dispatch(just for test)
  //const { fetchUsersT } = useThunk();

  useEffect(() => {
    dispatch(fetchUsersAsyncT());
    //fetchUsersT();
  }, []);

  if (loading) return <div>Wait for a moment, downloading info...</div>;

  if (error) return <div>Sorry, there is error during data fetching</div>;

  return (
    <>
      <div>
        <div>
          <button onClick={handleCreate}>Add new user</button>
        </div>
        <div>
          {users && users.map((user) => <User key={user.id} {...user} />)}
        </div>
      </div>
    </>
  );
};
