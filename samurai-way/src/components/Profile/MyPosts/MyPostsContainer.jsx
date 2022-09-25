import {
  addPost_AC,
  updateProfileField_AC,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
// import StoreContext from '../../../StoreContext';
import { connect } from 'react-redux';

// const MyPostsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         // console.log(store.getState());
//         let addPost = () => {
//           store.dispatch(addPost_AC());
//         };
//
//         let updateField = (value) => {
//           store.dispatch(updateProfileField_AC(value));
//         };
//         return (
//           <MyPosts
//             updateField={updateField}
//             addPost={addPost}
//             posts={store.getState().profile}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    posts: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateField: (value) => dispatch(updateProfileField_AC(value)),
    addPost: () => dispatch(addPost_AC()),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
