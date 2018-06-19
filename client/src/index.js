import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import './index.css';

// Queries
import { GET_AUTHED_USER } from './graphql/queries/user';

// Containers
import Home from './containers/pages/Home';
import Notifications from './containers/pages/Notifications';
import Login from './containers/pages/Login';
import Register from './containers/pages/Register';

// Components
import ProtectedRoute from './components/utils/ProtectedRoute';
import Query from './components/utils/CustomQuery';
import Navbar from './components/Navbar/';
import { PageContainer } from './components/shared/Containers';


const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Query query={GET_AUTHED_USER}>
        {({ data: { me: authenticatedUser } = {} }) => (
          <React.Fragment>
            <Navbar user={authenticatedUser} />

            {/* ===== ROUTES ===== */}
            <PageContainer>
              <ProtectedRoute
                exact
                path="/"
                component={Home}
                isAuthenticated={!!authenticatedUser}
              />
              <ProtectedRoute
                path="/notifications"
                component={Notifications}
                isAuthenticated={!!authenticatedUser}
              />

              <Route path="/login" render={() => <Login isAuthenticated={!!authenticatedUser} />} />
              <Route path="/register" component={Register} />
            </PageContainer>


          </React.Fragment>
        )}
      </Query>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
