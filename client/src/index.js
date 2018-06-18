import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import './index.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { GET_AUTHED_USER } from './graphql/queries/user';
import App from './containers/App';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tokenExists: !!localStorage.getItem('refreshToken'), // Optimistic auth check
    };
  }
  render() {
    const { tokenExists } = this.state;
    return (
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
