import usersReducer, { actions, InitialStateType } from './../../redux/users-reducer';

let state: InitialStateType;

//Reinitialization of the state before each test
beforeEach(() => {
  state = {
    usersData: [
      {
        id: 1,
        name: 'Somename 1',
        photos: { small: null, large: null },
        followed: false,
        status: 'somestatus 1',
      },
      {
        id: 2,
        name: 'Somename 2',
        photos: { small: null, large: null },
        followed: true,
        status: 'somestatus 2',
      },
    ],
    usersAmount: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [],
    filter: { term: '', friend: null },
  };
});

//For the users following
test('Users follow test', () => {
  const newState = usersReducer(state, actions.follow(1));

  expect(newState.usersData[0].followed).toBeTruthy();
});
