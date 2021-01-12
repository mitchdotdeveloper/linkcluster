import { takeLatest } from 'redux-saga/effects';
import {
  DELETE_LOGOUT_REQUEST,
  POST_LOGIN_REQUEST,
  POST_REFRESH_REQUEST,
  POST_SIGNUP_REQUEST,
} from './actions';
import {
  deleteLogoutSaga,
  postLoginSaga,
  postRefreshSaga,
  postSignupSaga,
} from './sagas';

function* watchPostSignup() {
  yield takeLatest(POST_SIGNUP_REQUEST, postSignupSaga);
}

function* watchPostLogin() {
  yield takeLatest(POST_LOGIN_REQUEST, postLoginSaga);
}

function* watchDeleteLogout() {
  yield takeLatest(DELETE_LOGOUT_REQUEST, deleteLogoutSaga);
}

function* watchPostRefresh() {
  yield takeLatest(POST_REFRESH_REQUEST, postRefreshSaga);
}

export default {
  watchPostSignup,
  watchPostLogin,
  watchDeleteLogout,
  watchPostRefresh,
};
