import { GetUserResponse } from 'types/services/api/user';
import { User, UserActionTypes } from 'types/services/store/user';

export const GET_USER_REQUEST = 'USER/GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'USER/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'USER/GET_USER_FAILURE';
export const UPDATE_USER_STORE_FROM_AUTH = 'USER/UPDATE_USER_STORE_FROM_AUTH';

export const getUser = (username: string): UserActionTypes => ({
  type: GET_USER_REQUEST,
  payload: { username },
});

export const getUserSuccess = (user: GetUserResponse): UserActionTypes => ({
  type: GET_USER_SUCCESS,
  payload: { user },
});

export const getUserFailure = (error: Error): UserActionTypes => ({
  type: GET_USER_FAILURE,
  payload: { error },
});

export const updateUserStoreFromAuth = (
  user: Partial<User>
): UserActionTypes => ({
  type: UPDATE_USER_STORE_FROM_AUTH,
  payload: { user },
});
