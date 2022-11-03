import { FC } from 'react';

import { TUserDetails } from '../Github';

type TProps = {
  userDetails: TUserDetails | null;
};

export const GithubDetails: FC<TProps> = ({ userDetails }) => {
  return (
    <>
      <div>
        <h1>{userDetails === null ? 'Name' : userDetails.login}</h1>
        {userDetails?.avatar_url && <img src={userDetails.avatar_url} alt="" />}

        <p>
          {userDetails === null
            ? 'Details'
            : `followers: ${userDetails.followers}; numbers of public repos: ${userDetails.public_repos}; score: ${userDetails.score}`}
        </p>
      </div>
    </>
  );
};
