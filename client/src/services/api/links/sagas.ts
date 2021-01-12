import { call, put } from 'redux-saga/effects';
import { getLinksFailure, getLinksSuccess } from './actions';
import { GetLinksRequestAction } from 'types/services/store/links';
import { LINKS } from './apiCalls';

export const getLinksSaga = function* ({
  payload: { userID },
}: GetLinksRequestAction) {
  const { links, error } = yield call(LINKS.getLinks, userID);

  if (links) yield put(getLinksSuccess(links));
  else yield put(getLinksFailure(error));
};
