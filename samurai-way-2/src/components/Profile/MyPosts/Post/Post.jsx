import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
      />
      {props.title}
      <div>
        <span>{props.positiveCounter} like</span>
      </div>
    </div>
  );
};

export default Post;
