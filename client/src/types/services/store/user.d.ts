import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_STORE_FROM_AUTH,
} from 'services/api/user/actions';
import { BasicResponseError } from 'types/services/api/common';
import { GetUserResponse } from 'types/services/api/user';

export type User = {
  userID: number;
  username: string;
};

export type UserStore = {
  userID: number | null;
  user: User | null;
  error: Error | null;
};

export type GetUserRequestAction = {
  type: typeof GET_USER_REQUEST;
  payload: {
    username: string;
  };
};
export type GetUserSuccessAction = {
  type: typeof GET_USER_SUCCESS;
  payload: { user: GetUserResponse };
};
export type GetUserFailureAction = {
  type: typeof GET_USER_FAILURE;
  payload: BasicResponseError;
};

export type UpdateUserStoreFromAuthAction = {
  type: typeof UPDATE_USER_STORE_FROM_AUTH;
  payload: { user: Partial<User> };
};

export type UserActionTypes =
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | UpdateUserStoreFromAuthAction;
