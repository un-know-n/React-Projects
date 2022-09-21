import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
  let postsData = [
    { id: 1, post: 'Post 1', likesCount: '12' },
    { id: 2, post: 'Post 2', likesCount: '14' },
    { id: 3, post: 'Post 3', likesCount: '1' },
    { id: 4, post: 'Post 4', likesCount: '18' },
  ];

  return (
    <div>
      <div className={classes.postsOverlay}>
        <h3>my posts</h3>
        <div>
          <div>
            <textarea>Enter new post</textarea>
          </div>
          <div>
            <button>Add post</button>
          </div>
        </div>
      </div>
      <div className={classes.posts}>
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
