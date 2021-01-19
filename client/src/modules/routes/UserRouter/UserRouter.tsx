import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'services/store/reducers';

export type UserRouterProps = {};

export const UserRouter: FC<UserRouterProps> = () => {
  const { path } = useRouteMatch();
  const { user } = useSelector(({ User }: RootState) => User);

  const { username } = user ?? {};

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={{ pathname: `${path}/${username}` }} />
      </Route>
      <Route path={`${path}/${username}`}>{username}</Route>
    </Switch>
  );
};
