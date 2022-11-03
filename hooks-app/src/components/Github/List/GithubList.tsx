import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { TUser, TUserDetails } from '../Github';

type TProps = {
  users: TUser[];
  setUserDetails: (userDetails: TUserDetails) => void;
};

export const GithubList: FC<TProps> = ({ users, setUserDetails }) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (selectedUser) document.title = selectedUser?.login;
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get<TUserDetails>(`https://api.github.com/users/${selectedUser?.login}`)
      .then((res) => setUserDetails(res.data));
  }, [selectedUser]);

  return (
    <>
      <div>
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              className={u.id === selectedUser?.id ? 'bg-gray-600' : ''}
              onClick={() => setSelectedUser(u)}
            >
              {u.login}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
