import React, { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { InitialStateType } from '../../../redux/profile-reducer';
import { maxField, requiredField } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const maxSymbols50 = maxField(50);

type TProps = {
  posts: InitialStateType;
  addPost: (post: string) => void;
};

type TMyPostsFormValues = {
  messageField: string;
};

type TMyPostsFormValuesKeys = Extract<keyof TMyPostsFormValues, string>;

const MyPosts = (props: TProps) => {
  let posts = props.posts.postsData.map((post) => (
    <Post title={post.title} positiveCounter={post.likesCount} key={post.id} />
  ));

  const onPostSubmit = (formData: TMyPostsFormValues) => {
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

const MyPostsForm: FC<InjectedFormProps<TMyPostsFormValues>> = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          {createField<TMyPostsFormValuesKeys>(
            'Enter your post',
            'messageField',
            [requiredField, maxSymbols50],
            Textarea,
            { type: 'text' },
          )}
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    </div>
  );
};

const MyPostsReduxForm = reduxForm<TMyPostsFormValues>({
  form: 'myPostsMessage',
})(MyPostsForm);

export default MyPosts;
