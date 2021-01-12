import {
  POST_SIGNUP_FAILURE,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  DELETE_LOGOUT_REQUEST,
  DELETE_LOGOUT_SUCCESS,
  DELETE_LOGOUT_FAILURE,
  POST_REFRESH_REQUEST,
  POST_REFRESH_SUCCESS,
  POST_REFRESH_FAILURE,
} from 'services/api/auth/actions';
import {
  PostSignupResponse,
  PostLoginResponse,
  PostRefreshResponse,
} from 'types/services/api/auth';
import { BasicResponseError } from 'types/services/api/common';

export type PostSignupRequestAction = {
  type: typeof POST_SIGNUP_REQUEST;
  payload: {
    username: string;
    password: string;
  };
};
export type PostSignupSuccessAction = {
  type: typeof POST_SIGNUP_SUCCESS;
  payload: { jwt: PostSignupResponse['jwt'] };
};
export type PostSignupFailureAction = {
  type: typeof POST_SIGNUP_FAILURE;
  payload: BasicResponseError;
};

export type PostLoginRequestAction = {
  type: typeof POST_LOGIN_REQUEST;
  payload: {
    username: string;
    password: string;
  };
};
export type PostLoginSuccessAction = {
  type: typeof POST_LOGIN_SUCCESS;
  payload: { jwt: PostLoginResponse['jwt'] };
};
export type PostLoginFailureAction = {
  type: typeof POST_LOGIN_FAILURE;
  payload: BasicResponseError;
};

export type DeleteLogoutRequestAction = {
  type: typeof DELETE_LOGOUT_REQUEST;
  payload: {
    userID: number;
  };
};
export type DeleteLogoutSuccessAction = {
  type: typeof DELETE_LOGOUT_SUCCESS;
  payload: {};
};
export type DeleteLogoutFailureAction = {
  type: typeof DELETE_LOGOUT_FAILURE;
  payload: BasicResponseError;
};

export type PostRefreshRequestAction = {
  type: typeof POST_REFRESH_REQUEST;
  payload: {
    username: string;
  };
};
export type PostRefreshSuccessAction = {
  type: typeof POST_REFRESH_SUCCESS;
  payload: PostRefreshResponse;
};
export type PostRefreshFailureAction = {
  type: typeof POST_REFRESH_FAILURE;
  payload: BasicResponseError;
};

export type AuthActionTypes =
  | PostSignupRequestAction
  | PostSignupSuccessAction
  | PostSignupFailureAction
  | PostLoginRequestAction
  | PostLoginSuccessAction
  | PostLoginFailureAction
  | DeleteLogoutRequestAction
  | DeleteLogoutSuccessAction
  | DeleteLogoutFailureAction
  | PostRefreshRequestAction
  | PostRefreshSuccessAction
  | PostRefreshFailureAction;

export type Auth = {
  jwt: string;
};

export type AuthStore = Auth & {
  error: Error | null;
};
