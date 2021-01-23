import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { RootState } from '../../../services/store/reducers';
import { Provider } from 'react-redux';
import { UserRouter } from './UserRouter';

describe('UserRouter Suite', () => {
  const mockStore = configureMockStore<RootState>();
  test('Renders /user/login route', () => {
    const store = mockStore({
      User: {
        user: {
          username: 'username',
        },
      },
    } as RootState);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/user']}>
          <Route path="/user">
            <UserRouter />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('username').textContent).toBe('username');

    cleanup();
  });
});
