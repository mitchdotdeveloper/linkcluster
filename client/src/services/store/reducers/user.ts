import produce from 'immer';
import _merge from 'lodash.merge';
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_STORE_FROM_AUTH,
} from 'services/api/user/actions';
import { UserActionTypes, UserStore } from 'types/services/store/user';

const initialState: UserStore = {
  userID: null,
  user: null,
  error: null,
};

export const User = (state = initialState, action: UserActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USER_REQUEST: {
        return state;
      }
      case GET_USER_SUCCESS: {
        const { user } = action.payload;

        draft.userID = user.userID;
        draft.user = user;
        draft.error = null;

        break;
      }
      case GET_USER_FAILURE: {
        const { error } = action.payload;

        draft.error = error;

        break;
      }
      case UPDATE_USER_STORE_FROM_AUTH: {
        const { user } = action.payload;

        if (user.userID) draft.userID = user.userID;
        draft.user = _merge(draft.user, user);

        break;
      }
    }
  });
