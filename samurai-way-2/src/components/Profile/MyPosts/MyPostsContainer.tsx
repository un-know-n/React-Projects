import { connect } from 'react-redux';

import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profile,
  };
};

const MyPostsContainer = connect(mapStateToProps, {
  addPost: actions.addPost_AC,
})(MyPosts);

export default MyPostsContainer;
