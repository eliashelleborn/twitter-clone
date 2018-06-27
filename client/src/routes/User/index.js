import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

// Components
import { Container } from '../../components/Containers';
import Header from './components/Header';
import Nav from './components/Nav';
import Sidebar from '../../components/Sidebar/';
import GetUser from './GetUser';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <StyledUserPage>

        <GetUser userParam={this.props.match.params.user}>
          {({ user, isAuthenticatedUser }) => (
            <React.Fragment>

              <Header avatar="https://source.unsplash.com/random/400x400" />
              <Nav />

              <Container id="content">

                <Sidebar>
                  <p>{user.username}</p>
                </Sidebar>

                <main>
                  <Route exact path={`${this.props.match.url}`} render={() => <p>Tweets</p>} />
                  <Route path={`${this.props.match.url}/following`} render={() => <p>Following</p>} />
                  <Route path={`${this.props.match.url}/followers`} render={() => <p>Followers</p>} />
                  <Route path={`${this.props.match.url}/likes`} render={() => <p>Likes</p>} />
                </main>

                <Sidebar>
                  {isAuthenticatedUser && <p>This is me.</p>}
                  {!isAuthenticatedUser && <p>This is not me.</p>}
                </Sidebar>

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
  a {
    display: block;
    font-size: 12px;
    color: blue;
  }

  #content {
    display: flex;
    main {
      flex: 1;
      margin: 0 10px;
    }
  }
`;

export default User;
