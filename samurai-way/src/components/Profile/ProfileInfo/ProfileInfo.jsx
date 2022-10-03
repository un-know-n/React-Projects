import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  return (
    <div>
      <div className={classes.profileBackground}>
        <img src={props.profile.photos.large} alt='' />
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
    </div>
  );
};

export default ProfileInfo;
