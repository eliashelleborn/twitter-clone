import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {
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
        <p>Register</p>
      </div>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Register;
