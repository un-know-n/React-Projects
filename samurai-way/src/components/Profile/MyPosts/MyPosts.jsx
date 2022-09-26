import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';

const MyPosts = (props) => {
  // console.log(props);
  let posts = props.posts.postsData.map((post) => (
    <Post title={post.title} positiveCounter={post.likesCount} key={post.id} />
  ));

  let textareaRef = React.createRef();

  let addPostOnChange = () => {
    //let value = textareaRef.current.value;
    //addPost(value);
    // props.addPost();
    props.addPost();
    // textareaRef.current.value = '';
    // props.updateInput('');
  };

  let updateFieldOnChange = () => {
    props.updateField(textareaRef.current.value);
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
              onChange={updateFieldOnChange}></textarea>
          </div>
          <div>
            <button onClick={addPostOnChange}>Add post</button>
          </div>
        </div>
      </div>
      <div className={classes.posts}>{posts}</div>
    </div>
  );
};

export default MyPosts;
