import { takeLatest } from 'redux-saga/effects';
import { GET_USER_REQUEST } from './actions';
import { getUserSaga } from './sagas';

function* watchGetUser() {
  yield takeLatest(GET_USER_REQUEST, getUserSaga);
}

export default { watchGetUser };
