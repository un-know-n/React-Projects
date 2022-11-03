import { FC, useEffect, useState } from 'react';

import { GithubDetails } from './Details/GithubDetails';
import { GithubList } from './List/GithubList';
import { GithubSearch } from './Search/GithubSearch';

export type TResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: TUser[];
};

export type TUser = {
  login: string;
  id: number;
  avatar_url: string;
  score: number;
};

export type TUserDetails = TUser & { followers: number; public_repos: number };

export const Github: FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [userDetails, setUserDetails] = useState<TUserDetails | null>(null);

  return (
    <>
      <div className="flex">
        <div>
          <GithubSearch setUsers={setUsers} />
          <GithubList setUserDetails={setUserDetails} users={users} />
        </div>
        <div>
          <GithubDetails userDetails={userDetails} />
        </div>
      </div>
    </>
  );
};
