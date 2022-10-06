import profileReducer, { addPost_AC, deletePost_AC } from '../../redux/profile-reducer';

// Test data
let addAction = addPost_AC('Some message!');
let deleteAction = deletePost_AC(4);
let state = {
  postsData: [
    { id: 1, title: 'Post 1', likesCount: '12' },
    { id: 2, title: 'Post 2', likesCount: '14' },
    { id: 3, title: 'Post 3', likesCount: '1' },
    { id: 4, title: 'Post 4', likesCount: '18' },
  ],
};

// Action
let newState = profileReducer(state, addAction);
let anotherState = profileReducer(state, deleteAction);

it('Length of posts should increment!', () => {
  // Expectation
  expect(newState.postsData.length).toBe(5);
});

it('Check message text!', () => {
  // Expectation
  expect(newState.postsData[state.postsData.length].title).toBe(
    'Some message!',
  );
});

it('Length of posts should decrement!', () => {
  // Expectation
  expect(anotherState.postsData.length).toBe(3);
});
