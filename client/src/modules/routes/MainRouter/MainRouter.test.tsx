import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { MainRouter } from './MainRouter';
import { RootState } from '../../../services/store/reducers/index';
import { Provider } from 'react-redux';

describe('MainRouter Suite', () => {
  const mockStore = configureMockStore<RootState>();

  test('Renders /auth route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/auth']}>
        <MainRouter />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();

    cleanup();
  });

  test('Renders /user route', () => {
    const store = mockStore({
      Auth: {
        isAuthenticated: true,
      },
      User: {
        user: { username: 'username' },
      },
    } as RootState);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/user']}>
          <MainRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    cleanup();
  });
});
