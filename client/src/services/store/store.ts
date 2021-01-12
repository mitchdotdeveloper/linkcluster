import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
