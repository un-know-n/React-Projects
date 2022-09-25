import sidebarReducer from './sidebar-reducer';
import dialogReducer from './dialog-reducer';
import profileReducer from './profile-reducer';

let store = {
  _callSubscriber() {},

  _state: {
    profile: {
      postsData: [
        { id: 1, title: 'Post 1', likesCount: '12' },
        { id: 2, title: 'Post 2', likesCount: '14' },
        { id: 3, title: 'Post 3', likesCount: '1' },
        { id: 4, title: 'Post 4', likesCount: '18' },
      ],
      textField: '',
    },

    messages: {
      dialogsData: [
        { id: 1, name: 'Person 1' },
        { id: 2, name: 'Person 2' },
        { id: 3, name: 'Person 3' },
        { id: 4, name: 'Person 4' },
        { id: 5, name: 'Person 5' },
      ],
      messagesData: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Message 3' },
        { id: 4, message: 'Message 4' },
      ],
      textField: '',
    },

    sidebar: {
      friendsData: [
        { id: 1, name: 'Person 1' },
        { id: 2, name: 'Person 2' },
        { id: 3, name: 'Person 3' },
      ],
    },
  },

  getState() {
    return this._state;
  },

  _addPost() {
    //postText
    let currentID = this._state.profile.postsData.at(-1).id;
    const newPostObj = {
      id: currentID ? currentID + 1 : 1,
      title: this._state.profile.textField,
      likesCount: '0',
    };
    this._state.profile.postsData.push(newPostObj);
    this._updateProfileField('');
    this._callSubscriber(this._state);
  },

  _updateProfileField(updText) {
    this._state.profile.textField = updText;
    this._callSubscriber(this._state);
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  _addMessage() {
    const currentID = this._state.messages.messagesData.at(-1).id;
    let message = {
      id: currentID ? currentID + 1 : 1,
      message: this._state.messages.textField,
    };
    this._state.messages.messagesData.push(message);
    this._updateMessageField('');
    this._callSubscriber(this._state);
  },

  _updateMessageField(updText) {
    this._state.messages.textField = updText;
    this._callSubscriber(this._state);
  },

  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action);
    this._state.messages = dialogReducer(this._state.messages, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

export default store;
