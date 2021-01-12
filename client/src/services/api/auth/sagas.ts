import { all, call, put } from 'redux-saga/effects';
import { AUTH } from 'services/api/auth/apiCalls';
import {
  DeleteLogoutRequestAction,
  PostLoginRequestAction,
  PostRefreshRequestAction,
  PostSignupRequestAction,
} from 'types/services/store/auth';
import {
  deleteLogoutFailure,
  deleteLogoutSuccess,
  postLoginFailure,
  postLoginSuccess,
  postRefreshFailure,
  postRefreshSuccess,
  postSignupFailure,
  postSignupSuccess,
} from 'services/api/auth/actions';
import { updateUserStoreFromAuth } from 'services/api/user/actions';

export const postSignupSaga = function* ({
  payload: { username, password },
}: PostSignupRequestAction) {
  const { jwt, error, ...userFields } = yield call(
    AUTH.postSignup,
    username,
    password
  );

  if (jwt) {
    yield all([
      yield put(postSignupSuccess(jwt)),
      yield put(updateUserStoreFromAuth(userFields)),
    ]);
  } else {
    yield put(postSignupFailure(error));
  }
};

export const postLoginSaga = function* ({
  payload: { username, password },
}: PostLoginRequestAction) {
  const { jwt, error, ...userFields } = yield call(
    AUTH.postLogin,
    username,
    password
  );

  if (jwt) {
    yield all([
      yield put(postLoginSuccess(jwt)),
      yield put(updateUserStoreFromAuth(userFields)),
    ]);
  } else {
    yield put(postLoginFailure(error));
  }
};

export const deleteLogoutSaga = function* ({
  payload: { userID },
}: DeleteLogoutRequestAction) {
  const { error } = yield call(AUTH.deleteLogout, userID);

  yield all([
    yield put(deleteLogoutSuccess),
    yield put(deleteLogoutFailure(error)),
  ]);
};

export const postRefreshSaga = function* ({
  payload: { username },
}: PostRefreshRequestAction) {
  const { jwt, error } = yield call(AUTH.postRefresh, username);

  if (jwt) {
    yield put(postRefreshSuccess({ jwt }));
  } else {
    yield put(postRefreshFailure(error));
  }
};
