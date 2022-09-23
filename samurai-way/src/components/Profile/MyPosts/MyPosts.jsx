import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';
import { addPost_AC, updateProfileField_AC } from '../../../redux/state';

const MyPosts = (props) => {
  // console.log(props);
  let posts = props.posts.postsData.map((post) => (
    <Post title={post.title} positiveCounter={post.likesCount} />
  ));

  let textareaRef = React.createRef();

  let addPost = () => {
    //let value = textareaRef.current.value;
    //addPost(value);
    // props.addPost();
    props.dispatch(addPost_AC());
    // textareaRef.current.value = '';
    // props.updateInput('');
  };

  let updateField = () => {
    props.dispatch(updateProfileField_AC(textareaRef.current.value));
    // props.updateInput();
    // console.log(textareaRef.current.value);
    // console.log(props.posts);
  };

  return (
    <div>
      <div className={classes.postsOverlay}>
        <h3>my posts</h3>
        <div>
          <div>
            <textarea
              ref={textareaRef}
              value={props.posts.textField}
              onChange={updateField}
            ></textarea>
          </div>
          <div>
            <button onClick={addPost}>Add post</button>
          </div>
        </div>
      </div>
      <div className={classes.posts}>{posts}</div>
    </div>
  );
};

export default MyPosts;
