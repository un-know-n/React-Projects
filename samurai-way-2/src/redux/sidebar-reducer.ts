export type FriendsDataType = {
  id: number;
  name: string;
};

let initialState = {
  friendsData: [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
  ] as Array<FriendsDataType>,
};

type InitialStateType = typeof initialState;

const sidebarReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  return { ...state };
};

export default sidebarReducer;
