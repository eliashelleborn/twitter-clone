import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
// import { Mutation } from 'react-apollo';

// Routes
import Tweets from './routes/Tweets';

// Components
import { Container } from '../../components/Layout/Containers';
import Header from './components/Header';
import Nav from './components/Nav';
import Side from '../../components/Layout/Side';
import GetUser from './GetUser';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <StyledUserPage>
        <GetUser userParam={this.props.match.params.user}>
          {({ user, isAuthenticatedUser }) => (
            <React.Fragment>
              <Header avatar={user.profileImage} banner={user.profileBanner} />
              <Nav user={user} isAuthenticatedUser={isAuthenticatedUser} />

              <Container flex>
                <Side>
                  <p>{user.username}</p>
                  {!isAuthenticatedUser && (
                    <strong>{user.relation.followingMe ? 'Following You' : ''}</strong>
                  )}
                </Side>

                <Route
                  exact
                  path={`${this.props.match.url}`}
                  render={routeProps => (
                    <Tweets {...routeProps} user={user} isAuthenticatedUser={isAuthenticatedUser} />
                  )}
                />
                <Route path={`${this.props.match.url}/following`} render={() => <p>Following</p>} />
                <Route path={`${this.props.match.url}/followers`} render={() => <p>Followers</p>} />
                <Route path={`${this.props.match.url}/likes`} render={() => <p>Likes</p>} />
              </Container>
            </React.Fragment>
          )}
        </GetUser>
      </StyledUserPage>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      user: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const StyledUserPage = styled.div`
  padding-top: 46px;
`;

export default User;
