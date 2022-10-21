import { addPost_AC } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    posts: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (message) => dispatch(addPost_AC(message)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
