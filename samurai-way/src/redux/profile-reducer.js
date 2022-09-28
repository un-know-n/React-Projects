import news from '../components/News/News';

const ADD_POST = 'ADD-POST';
const UPDATE_PROFILE_FIELD = 'UPDATE-PROFILE-FIELD';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
  postsData: [
    { id: 1, title: 'Post 1', likesCount: '12' },
    { id: 2, title: 'Post 2', likesCount: '14' },
    { id: 3, title: 'Post 3', likesCount: '1' },
    { id: 4, title: 'Post 4', likesCount: '18' },
  ],
  textField: '',
  profile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let currentID = state.postsData.at(-1).id;
      const newPostObj = {
        id: currentID ? currentID + 1 : 1,
        title: state.textField,
        likesCount: '0',
      };
      return {
        ...state,
        postsData: [...state.postsData, newPostObj],
        textField: '',
      };

    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        textField: action.updText,
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
  // return { ...state };
};

export default profileReducer;

export const addPost_AC = () => ({ type: ADD_POST });
export const updateProfileField_AC = (updText) => ({
  type: UPDATE_PROFILE_FIELD,
  updText: updText,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
