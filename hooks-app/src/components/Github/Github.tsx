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

const defaultSearchTerm = 'unk';

export const Github: FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [userDetails, setUserDetails] = useState<TUserDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  return (
    <>
      <div className="flex">
        <div>
          <GithubSearch
            setUsers={setUsers}
            searchTerm={searchTerm}
            setSearchTerm={(value: string) => setSearchTerm(value)}
          />
          <button onClick={() => setSearchTerm(defaultSearchTerm)}>
            reset
          </button>
          <GithubList setUserDetails={setUserDetails} users={users} />
        </div>
        <div>
          <GithubDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
      </div>
    </>
  );
};
