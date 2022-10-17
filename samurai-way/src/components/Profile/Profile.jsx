import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
//import classes from './Profile.module.css';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        param={props.param}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
