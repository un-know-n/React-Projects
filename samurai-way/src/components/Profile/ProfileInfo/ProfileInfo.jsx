import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import userImg from './../../../assets/images/user.webp';

const ProfileInfo = (props) => {
  const onPhotoSeleted = (event) => {
    if (event.target.files.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  return (
    <div>
      <div className={classes.profileBackground}>
        <img src={props.profile.photos.large || userImg} alt='' />
      </div>
      <div className={classes.descriptionBlock}>
        <div className={classes.fullName}>{props.profile.fullName}</div>
        <div className={classes.aboutMe}>{props.profile.aboutMe}</div>
        <div className={classes.lookingForJob}>
          {props.profile.lookingForAJob}
        </div>
        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      </div>
      {props.isOwner && <input type='file' onChange={onPhotoSeleted} />}
    </div>
  );
};

export default ProfileInfo;
