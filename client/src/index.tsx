import { MainRouter } from 'modules/routes/MainRouter/MainRouter';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'services/store/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.ROUTER_BASE_NAME}>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
