import { FC } from 'react';

import { ProfileType } from '../../shared/types/reducer-types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type TProps = {
  param: Readonly<Partial<{ userId?: string | undefined }>>;
  isOwner: boolean;
  profile: ProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
  getUserStatus: (userId: number) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
};

const Profile: FC<TProps> = (props) => {
  return (
    <div>
      <ProfileInfo
        param={props.param}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
