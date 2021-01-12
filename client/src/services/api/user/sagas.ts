import { GetUserRequestAction } from 'types/services/store/user';
import { call, put } from 'redux-saga/effects';
import { USER } from 'services/api/user/apiCalls';
import { getUserFailure, getUserSuccess } from './actions';

export const getUserSaga = function* ({
  payload: { username },
}: GetUserRequestAction) {
  const { user, error } = yield call(USER.getUser, username);

  if (user) yield put(getUserSuccess(user));
  else yield put(getUserFailure(error));
};
