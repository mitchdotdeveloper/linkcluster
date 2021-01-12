import { all, fork } from 'redux-saga/effects';
import userWatchers from 'services/api/user/watchers';
import authWatchers from 'services/api/auth/watchers';
import linksWatchers from 'services/api/links/watchers';

export const rootSaga = function* () {
  yield all(
    [
      ...Object.values(userWatchers),
      ...Object.values(authWatchers),
      ...Object.values(linksWatchers),
    ].map(fork)
  );
};
