import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { TResponse, TUser } from '../Github';

type TProps = {
  
  setUsers: (users: TUser[]) => void;
};

export const GithubSearch: FC<TProps> = ({
  
  setUsers,
  
}) => {
  const [tempSearch, setTempSearch] = useState('it-kamasutra');
  const [searchTerm, setSearchTerm] = useState('it-kamasutra');

  useEffect(() => {
    axios
      .get<TResponse>(`https://api.github.com/search/users?q=${tempSearch}`)
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
          onClick={() => setSearchTerm(tempSearch)}
        >
          Find
        </button>
      </div>
    </>
  );
};
