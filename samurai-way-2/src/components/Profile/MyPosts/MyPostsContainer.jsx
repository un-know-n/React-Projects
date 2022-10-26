import { connect } from 'react-redux';

import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    posts: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (message) => dispatch(actions.addPost_AC(message)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
