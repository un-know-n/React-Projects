import { FC } from 'react';

import { TUserDetails } from '../Github';
import { Timer } from '../Timer/Timer';

export type TProps = {
  userDetails: TUserDetails | null;
  setUserDetails: (details: TUserDetails | null) => void;
};

export const GithubDetails: FC<TProps> = ({ userDetails, setUserDetails }) => {
  return (
    <>
      <div>
        {userDetails !== null && (
          <Timer userDetails={userDetails} setUserDetails={setUserDetails} />
        )}
        <br />
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
