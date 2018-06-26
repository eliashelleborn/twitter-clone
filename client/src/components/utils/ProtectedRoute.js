import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated === true
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
PrivateRoute.defaultProps = {
  location: null,
};


export default PrivateRoute;
