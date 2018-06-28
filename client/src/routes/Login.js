import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ApolloConsumer } from 'react-apollo';
import { LOGIN } from '../graphql/mutations/auth';
import { UPDATE_AUTHED_USER } from '../graphql/state/authUser';

// Components
import { PageContainer } from '../components/Layout/Containers';
import { Form, Input, Group } from '../components/Form';
import { Button } from '../components/Button';

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
      <PageContainer>
        <ApolloConsumer>
          {client => (
            <Wrapper>
              <h1>Login</h1>
              <Form
                id="login"
                onSubmit={(e) => {
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
                <Group>
                  <Input type="email" name="email" placeholder="Email" value={this.state.inputs.email} onChange={this.handleChange} />
                </Group>
                <Group>
                  <Input type="password" name="password" placeholder="Password" value={this.state.inputs.password} onChange={this.handleChange} />
                </Group>
              </Form>
              <Button type="submit" form="login">Log in</Button>
            </Wrapper>
          )}
        </ApolloConsumer>
      </PageContainer>

    );
  }
}

const Wrapper = styled.div`
  max-width: 590px;
  padding: 50px;
  background-color: #fff;
  margin: 0 auto;
`;

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
