import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ProtectedRoute } from './ProtectedRoute';
import { RootState } from '../../../services/store/reducers';

describe('ProtectedRoute Suite', () => {
  const mockStore = configureMockStore<RootState>();

  test('Renders protected route', () => {
    const store = mockStore({
      Auth: {
        isAuthenticated: true,
      },
    } as RootState);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected-route']}>
          <ProtectedRoute exact path="/protected-route">
            authenticated
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('authenticated').textContent).toBe('authenticated');

    cleanup();
  });

  test('Does not render protected route and redirects to login route', () => {
    const store = mockStore({
      Auth: {
        isAuthenticated: false,
      },
    } as RootState);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected-route']}>
          <ProtectedRoute exact path="/protected-route" />
          <Route exact path="/auth/login">
            redirected to login path
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('redirected to login path').textContent).toBe(
      'redirected to login path'
    );

    cleanup();
  });
});
