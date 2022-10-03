import classes from '../Users.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../assets/images/user.webp';

const User = ({
  user,
  followInProgress,
  unfollowUserThunkCreator,
  followUserThunkCreator,
}) => {
  return (
    <div key={user.id} className={classes.userContainer}>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              className={classes.userImage}
              src={user.photos.large != null ? user.photos.large : userPhoto}
              alt=''
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollowUserThunkCreator(user.id);
              }}>
              Unfollow
            </button>
          ) : (
            <button
              disabled={followInProgress.some((id) => id === user.id)}
              onClick={() => {
                followUserThunkCreator(user.id);
              }}>
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
