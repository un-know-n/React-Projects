import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form';

const MyPosts = (props) => {
  // console.log(props);
  let posts = props.posts.postsData.map((post) => (
    <Post title={post.title} positiveCounter={post.likesCount} key={post.id} />
  ));

  const onPostSubmit = (formData) => {
    // console.log(formData.messageField);
    props.addPost(formData.messageField);
  };

  return (
    <div>
      <div className={classes.postsOverlay}>
        <h3>my posts</h3>
        <MyPostsReduxForm onSubmit={onPostSubmit} />
      </div>
      <div className={classes.posts}>{posts}</div>
    </div>
  );
};

const MyPostsForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name='messageField' component='textarea' />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    </div>
  );
};

const MyPostsReduxForm = reduxForm({
  form: 'myPostsMessage',
})(MyPostsForm);

export default MyPosts;
