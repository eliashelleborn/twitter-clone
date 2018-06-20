import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/* import PropTypes from 'prop-types'; */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';
import './index.css';

// Queries
import { GET_AUTHED_USER, UPDATE_AUTHED_USER } from './graphql/state/authUser';
import { AUTHENTICATE_WITH_TOKEN } from './graphql/mutations/auth';

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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authIsLoading: true,
    };
  }
  componentDidMount = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) this.tryTokenAuthenticate();
    else this.setState({ authIsLoading: false });
  }
  tryTokenAuthenticate = () => {
    client.query({
      query: AUTHENTICATE_WITH_TOKEN,
      fetchPolicy: 'network-only',
    }).then(({ data }) => {
      client.mutate({
        mutation: UPDATE_AUTHED_USER,
        variables: { user: data.me },
      });
      this.setState({ authIsLoading: false });
    }).catch((err) => {
      this.setState({ authIsLoading: false });
    });
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>

          {!this.state.authIsLoading &&
            <Query query={GET_AUTHED_USER}>
              {({ data: { authedUser } }) => (
                <React.Fragment>
                  <Navbar user={authedUser} />

                  {/* ===== ROUTES ===== */}
                  <PageContainer>
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
              )}
            </Query>
          }

        </Router>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
