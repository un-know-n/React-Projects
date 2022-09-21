import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div>
      <div className={classes.profileBackground}>
        <img
          src="https://media.istockphoto.com/photos/extreme-close-up-of-thrashing-emerald-ocean-waves-picture-id1368264124?b=1&k=20&m=1368264124&s=170667a&w=0&h=VzwEBjaq609S8HxHQdT47HB6WRP-MO_bkXgxo9MdGMI="
          alt=""
        />
      </div>
      <div className={classes.descriptionBlock}>ava + desc</div>
    </div>
  );
};

export default ProfileInfo;
