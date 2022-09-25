import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
//import classes from './Profile.module.css';

const Profile = () => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer />
      {/*posts={props.posts} dispatch={props.dispatch}*/}
    </div>
  );
};

export default Profile;
