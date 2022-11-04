import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { TResponse, TUser } from '../Github';

type TProps = {
  setUsers: (users: TUser[]) => void;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
};

export const GithubSearch: FC<TProps> = ({
  setUsers,
  setSearchTerm,
  searchTerm,
}) => {
  const [tempSearch, setTempSearch] = useState('unk');

  useEffect(() => {
    setTempSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get<TResponse>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((res) => setUsers(res.data.items));
  }, [searchTerm]);

  return (
    <>
      <div>
        <input
          className="p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.currentTarget.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => {
            debugger;
            return setSearchTerm(tempSearch);
          }}
        >
          Find
        </button>
      </div>
    </>
  );
};
