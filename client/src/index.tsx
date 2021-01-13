import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'services/store/store';

ReactDOM.render(
  <Provider store={store}>
    <h1>hi</h1>
  </Provider>,
  document.getElementById('root')
);
