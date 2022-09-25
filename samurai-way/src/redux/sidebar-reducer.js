let initialState = {
  friendsData: [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
  ],
};

const sidebarReducer = (state = initialState, action) => {
  return { ...state };
};

export default sidebarReducer;
