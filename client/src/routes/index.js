import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';

// Route Components
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Notifications from './Notifications';
import Settings from './Settings';
import User from './User/';

const Routes = props => (
  <Switch>
    {/* ===== PROTECTED ROUTES ===== */}
    <ProtectedRoute exact path="/" component={Home} isAuthenticated={!!props.authedUser} />
    <ProtectedRoute
      path="/notifications"
      component={Notifications}
      isAuthenticated={!!props.authedUser}
    />
    <ProtectedRoute path="/settings" component={Settings} isAuthenticated={!!props.authedUser} />

    {/* ===== PUBLIC ROUTES ===== */}
    <Route path="/login" render={() => <Login isAuthenticated={!!props.authedUser} />} />
    <Route path="/register" component={Register} />

    <Route path="/search" render={() => <p>Search</p>} />

    <Route path="/:user" component={User} />

    <Route render={() => <p>404</p>} />
  </Switch>
);

Routes.propTypes = {
  authedUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Routes.defaultProps = {
  authedUser: null,
};

export default Routes;
