import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import userImg from './../../../assets/images/user.webp';
import { useState } from 'react';
import ProfileData from './ProfileDataForm/ProfileData';
import ProfileDataFormRedux from './ProfileDataForm/ProfileDataForm';

const ProfileInfo = (props) => {
  const onPhotoSeleted = (event) => {
    if (event.target.files.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  let [editMode, setEditMode] = useState(false);

  const onDataFormSubmit = (formData) => {
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
