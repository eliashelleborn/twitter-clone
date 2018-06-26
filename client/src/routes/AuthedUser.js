import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

class AuthedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('authUser');
  }
  render() {
    return (
      <StyledAuthedUser>
        <h1>Authenticated User</h1>
        <Link to={`${this.props.match.url}`}>Tweets</Link>
        <Link to={`${this.props.match.url}/followers`}>Followers</Link>
        <Link to={`${this.props.match.url}/following`} >Following</Link>
        <Link to={`${this.props.match.url}/likes`}>Likes</Link>


        <Route exact path={`${this.props.match.url}`} render={() => <p>Tweets</p>} />
        <Route path={`${this.props.match.url}/following`} render={() => <p>Following</p>} />
        <Route path={`${this.props.match.url}/followers`} render={() => <p>Followers</p>} />
        <Route path={`${this.props.match.url}/likes`} render={() => <p>Likes</p>} />
      </StyledAuthedUser>
    );
  }
}

AuthedUser.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledAuthedUser = styled.div`
  a {
    display: block;
    font-size: 12px;
    color: blue;
  }
`;

export default AuthedUser;
