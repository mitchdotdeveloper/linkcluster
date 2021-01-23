import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from 'services/store/reducers';

export const ProtectedRoute = ({ children, ...props }: RouteProps) => {
  const { isAuthenticated } = useSelector(({ Auth }: RootState) => Auth);

  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to="/auth/login" />}
    </Route>
  );
};
