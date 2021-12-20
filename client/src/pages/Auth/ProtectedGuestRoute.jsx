import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedGuestRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state);

  return (
    <Route
      {...rest}
      render={() =>
        user && user.token ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
