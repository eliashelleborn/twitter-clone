import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';
import { GET_AUTHED_USER } from '../graphql/queries/user';

// Containers
import Home from '../containers/pages/Home';
import Notifications from '../containers/pages/Notifications';
import Login from '../containers/pages/Login';
import Register from '../containers/pages/Register';

// Components
import Navbar from '../components/Navbar/';
import { PageContainer } from '../components/shared/Containers';


const App = ({ data: { me: authedUser, error, loading } }) => (
  <React.Fragment>
    <Navbar user={authedUser} />
    <PageContainer>
      {/* ROUTES */}
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={!!authedUser}
      />
      <ProtectedRoute
        path="/notifications"
        component={Notifications}
        isAuthenticated={!!authedUser}
      />
      <Route path="/login" render={() => <Login isAuthenticated={!!authedUser} />} />
      <Route path="/register" component={Register} />
    </PageContainer>
  </React.Fragment>
);

App.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default graphql(GET_AUTHED_USER)(App);
