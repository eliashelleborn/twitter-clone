import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { LOGIN } from '../../graphql/mutations/auth';
import { UPDATE_AUTHED_USER } from '../../graphql/state/authUser';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        email: '',
        password: '',
      },
    };
  }
  handleChange = (e) => {
    const inputs = { ...this.state.inputs };
    inputs[e.target.name] = e.target.value;
    this.setState({ inputs });
  }
  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    return (
      <ApolloConsumer>
        { client => (
          <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const { email, password } = this.state.inputs;
                client.mutate({
                  mutation: LOGIN,
                  variables: { email, password },
                })
                .then(({ data: { login: { user } } }) => {
                  if (user) {
                    client.mutate({
                      mutation: UPDATE_AUTHED_USER,
                      variables: { user },
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              }}
            >
              <input type="text" name="email" value={this.state.inputs.email} onChange={this.handleChange} />
              <input type="text" name="password" value={this.state.inputs.password} onChange={this.handleChange} />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
