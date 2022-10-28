import { ChangeEvent, FC, useState } from 'react';

import { ProfileType } from '../../../shared/types/reducer-types';
import userImg from './../../../assets/images/user.webp';
import ProfileData from './ProfileDataForm/ProfileData';
import ProfileDataFormRedux from './ProfileDataForm/ProfileDataForm';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';

type TProps = {
  param: Readonly<Partial<{ userId?: string | undefined }>>;
  isOwner: boolean;
  status: string;
  profile: ProfileType;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
};

const ProfileInfo: FC<TProps> = (props) => {
  const onPhotoSeleted = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  let [editMode, setEditMode] = useState(false);

  const onDataFormSubmit = (formData: ProfileType) => {
    console.log(formData);
    //setEditMode(false);
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={classes.profileBackground}>
        <img src={props.profile.photos.large || userImg} alt='' />
      </div>
      <ProfileStatusWithHooks
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      {props.isOwner && <input type='file' onChange={onPhotoSeleted} />}
      {/*Component Data*/}
      {editMode ? (
        <ProfileDataFormRedux
          initialValues={props.profile}
          onSubmit={onDataFormSubmit}
          {...props}
        />
      ) : (
        <ProfileData setEditMode={setEditMode} {...props} />
      )}
    </div>
  );
};

export default ProfileInfo;
