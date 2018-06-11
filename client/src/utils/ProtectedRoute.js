import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  location: {
    pathname: '',
  },
};

export default PrivateRoute;
