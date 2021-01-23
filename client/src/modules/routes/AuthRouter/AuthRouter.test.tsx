import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';

describe('AuthRouter Suite', () => {
  test('Renders /auth/login route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/auth']}>
        <Route path="/auth">
          <AuthRouter />
        </Route>
      </MemoryRouter>
    );

    expect(getByText('/auth/login').textContent).toBe('/auth/login');

    cleanup();
  });
});
