import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
//import classes from './Profile.module.css';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.posts} dispatch={props.dispatch} />
    </div>
  );
};

export default Profile;
