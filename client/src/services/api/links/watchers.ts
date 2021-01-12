import { debounce } from 'redux-saga/effects';
import { GET_LINKS_REQUEST } from './actions';
import { getLinksSaga } from './sagas';

function* watchGetLinks() {
  yield debounce(250, GET_LINKS_REQUEST, getLinksSaga);
}

export default { watchGetLinks };
