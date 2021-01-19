import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

export type AuthRouterProps = {};

export const AuthRouter: FC<AuthRouterProps> = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`${url}/login`} />
      </Route>
      <Route path={`${path}/login`}>/auth/login</Route>
    </Switch>
  );
};
