import {
  PostSignupResponse,
  PostLoginResponse,
  PostRefreshResponse,
} from 'types/services/api/auth';
import { AuthActionTypes } from 'types/services/store/auth';

export const POST_SIGNUP_REQUEST = 'AUTH/POST_SIGNUP_REQUEST';
export const POST_SIGNUP_SUCCESS = 'AUTH/POST_SIGNUP_SUCCESS';
export const POST_SIGNUP_FAILURE = 'AUTH/POST_SIGNUP_FAILURE';

export const POST_LOGIN_REQUEST = 'AUTH/POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'AUTH/POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'AUTH/POST_LOGIN_FAILURE';

export const DELETE_LOGOUT_REQUEST = 'AUTH/DELETE_LOGOUT_REQUEST';
export const DELETE_LOGOUT_SUCCESS = 'AUTH/DELETE_LOGOUT_SUCCESS';
export const DELETE_LOGOUT_FAILURE = 'AUTH/DELETE_LOGOUT_FAILURE';

export const POST_REFRESH_REQUEST = 'AUTH/POST_REFRESH_REQUEST';
export const POST_REFRESH_SUCCESS = 'AUTH/POST_REFRESH_SUCCESS';
export const POST_REFRESH_FAILURE = 'AUTH/POST_LOGIN_FAILURE';

export const postSignup = (
  username: string,
  password: string
): AuthActionTypes => ({
  type: POST_SIGNUP_REQUEST,
  payload: { username, password },
});
export const postSignupSuccess = (
  jwt: PostSignupResponse['jwt']
): AuthActionTypes => ({
  type: POST_SIGNUP_SUCCESS,
  payload: { jwt },
});
export const postSignupFailure = (error: Error): AuthActionTypes => ({
  type: POST_SIGNUP_FAILURE,
  payload: { error },
});

export const postLogin = (
  username: string,
  password: string
): AuthActionTypes => ({
  type: POST_LOGIN_REQUEST,
  payload: { username, password },
});
export const postLoginSuccess = (
  jwt: PostLoginResponse['jwt']
): AuthActionTypes => ({
  type: POST_LOGIN_SUCCESS,
  payload: { jwt },
});
export const postLoginFailure = (error: Error): AuthActionTypes => ({
  type: POST_LOGIN_FAILURE,
  payload: { error },
});

export const deleteLogout = (userID: number): AuthActionTypes => ({
  type: DELETE_LOGOUT_REQUEST,
  payload: { userID },
});
export const deleteLogoutSuccess: AuthActionTypes = {
  type: DELETE_LOGOUT_SUCCESS,
  payload: {},
};
export const deleteLogoutFailure = (error: Error): AuthActionTypes => ({
  type: DELETE_LOGOUT_FAILURE,
  payload: { error },
});

export const postRefresh = (username: string): AuthActionTypes => ({
  type: POST_REFRESH_REQUEST,
  payload: { username },
});
export const postRefreshSuccess = (
  payload: PostRefreshResponse
): AuthActionTypes => ({
  type: POST_REFRESH_SUCCESS,
  payload,
});
export const postRefreshFailure = (error: Error): AuthActionTypes => ({
  type: POST_REFRESH_FAILURE,
  payload: { error },
});
