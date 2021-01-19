import produce from 'immer';
import {
  DELETE_LOGOUT_FAILURE,
  DELETE_LOGOUT_REQUEST,
  DELETE_LOGOUT_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_REFRESH_FAILURE,
  POST_REFRESH_REQUEST,
  POST_REFRESH_SUCCESS,
  POST_SIGNUP_FAILURE,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
} from 'services/api/auth/actions';
import { AuthActionTypes, AuthStore } from 'types/services/store/auth';

const initialState: AuthStore = {
  jwt: '',
  isAuthenticated: false,
  error: null,
};

export const Auth = (state = initialState, action: AuthActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_SIGNUP_REQUEST:
      case POST_LOGIN_REQUEST:
      case DELETE_LOGOUT_REQUEST:
      case POST_REFRESH_REQUEST: {
        return state;
      }
      case POST_SIGNUP_SUCCESS:
      case POST_LOGIN_SUCCESS:
      case POST_REFRESH_SUCCESS: {
        const { jwt } = action.payload;

        draft.jwt = jwt;
        draft.isAuthenticated = true;
        draft.error = null;

        break;
      }
      case DELETE_LOGOUT_SUCCESS: {
        return initialState;
      }
      case POST_SIGNUP_FAILURE:
      case POST_LOGIN_FAILURE:
      case DELETE_LOGOUT_FAILURE:
      case POST_REFRESH_FAILURE: {
        const { error } = action.payload;

        draft.isAuthenticated = false;
        draft.error = error;

        break;
      }
    }
  });
