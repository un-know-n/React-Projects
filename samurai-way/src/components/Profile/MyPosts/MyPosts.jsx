//import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div>
      my posts
      <div>
        <textarea>Enter new post</textarea>
        <button>Add post</button>
      </div>
      <div>
        <Post title="post1" positiveCounter="12" />
        <Post title="postasfasdf" positiveCounter="13" />
        <Post title="postdasf" positiveCounter="2" />
        <Post title="post2" />
        <Post title="post3" />
      </div>
    </div>
  );
};

export default MyPosts;
