import { TRootState } from '..';

export const takeUser = (state: TRootState) => state.user;

export const takeDocument = (state: TRootState) =>
  state.user.commentsDocumentId;
