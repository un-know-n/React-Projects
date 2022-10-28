import userImage from './../../../../assets/images/user.webp';
import classes from './Post.module.css';

type PropsType = {
  title: string;
  positiveCounter: string;
};

const Post = (props: PropsType) => {
  return (
    <div className={classes.item}>
      <img src={userImage} alt='' />
      {props.title}
      <div>
        <span>{props.positiveCounter} like</span>
      </div>
    </div>
  );
};

export default Post;
