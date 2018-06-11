import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <p>Login</p>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
