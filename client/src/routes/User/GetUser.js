import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { GET_AUTHED_USER } from '../../graphql/state/authUser';
import { GET_USER } from '../../graphql/queries/user';

class GetUser extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <Query query={GET_AUTHED_USER}>
        {({ data: { authedUser } }) => {
          if (authedUser.username === this.props.userParam) {
            return this.props.children({ user: authedUser, isAuthenticatedUser: true });
          }
          return (
            <Query query={GET_USER} variables={{ username: this.props.userParam }}>
              {({ data: { getUser } }) => {
                if (getUser) {
                  return this.props.children({ user: getUser, isAuthenticatedUser: false });
                }
                return <p>User not found</p>;
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

GetUser.propTypes = {
  children: PropTypes.func.isRequired,
  userParam: PropTypes.string.isRequired,
};

export default GetUser;
