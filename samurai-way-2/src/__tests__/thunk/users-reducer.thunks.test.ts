import { GeneralResponse } from '../../api/api';
import { usersAPI } from '../../api/users-api';
import { actions, followUserThunkCreator } from '../../redux/users-reducer';
import { ResultCodes } from '../../shared/types/reducer-types';

//Mock the usersAPI
jest.mock('../../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: GeneralResponse = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
};

const resultData = {
  data: { ...result },
};

test('Check the follow thunk', async () => {
  //@ts-ignore
  usersAPIMock.followUser.mockReturnValue(resultData);

  //Take the follow thunk from users-reducer
  const thunk = await followUserThunkCreator(1);

  //Create custom dispatch function
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  //Call the thunk
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowInProgress(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowInProgress(false, 1),
  );
});
