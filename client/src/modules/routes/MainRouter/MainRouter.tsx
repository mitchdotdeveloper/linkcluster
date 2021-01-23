import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRouter } from '../AuthRouter/AuthRouter';
import { UserRouter } from '../UserRouter/UserRouter';
import { ProtectedRoute } from 'modules/helpers/ProtectedRoute/ProtectedRoute';

export type MainRouterProps = {};

export const MainRouter: FC<MainRouterProps> = () => {
  return (
    <Switch>
      <Route path="/auth">
        <AuthRouter />
      </Route>
      <ProtectedRoute path="/user">
        <UserRouter />
      </ProtectedRoute>
    </Switch>
  );
};
