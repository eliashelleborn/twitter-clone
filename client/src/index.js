import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import './index.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { GET_AUTHED_USER } from './graphql/queries/user';

// Containers
import Home from './containers/Home';
import Notifications from './containers/Notifications';
import Login from './containers/Login';
import Register from './containers/Register';

// Components
import Navbar from './components/Navbar/';
import { PageContainer } from './components/shared/Containers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tokenExists: !!localStorage.getItem('refreshToken'),
    };
  }
  componentDidMount() {
    // Try getting user if refreshToken exists
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (refreshToken) {
      client.query({ query: GET_AUTHED_USER })
        .then((res) => {
          this.setState({ user: res.data.me });
        })
        // If no user is returned, remove all tokens (logout)
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('refreshToken');
          if (accessToken) localStorage.removeItem('accessToken');
        });
    }
  }

  render() {
    const { tokenExists } = this.state;
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>

            <Navbar user={this.state.user} />

            <PageContainer>

              {/* ROUTES */}
              <ProtectedRoute path="/" exact component={Home} isAuthenticated={tokenExists} />
              <ProtectedRoute
                path="/notifications"
                component={Notifications}
                isAuthenticated={tokenExists}
              />

              {/* AUTH ROUTES */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

            </PageContainer>


          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
