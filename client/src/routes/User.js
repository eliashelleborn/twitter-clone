import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('User');
  }
  render() {
    return (
      <StyledUser>
        <h1>User</h1>
        <Link to={`${this.props.match.url}`}>Tweets</Link>
        <Link to={`${this.props.match.url}/followers`}>Followers</Link>
        <Link to={`${this.props.match.url}/following`} >Following</Link>
        <Link to={`${this.props.match.url}/likes`}>Likes</Link>


        <Route exact path={`${this.props.match.url}`} render={() => <p>Tweets</p>} />
        <Route path={`${this.props.match.url}/following`} render={() => <p>Following</p>} />
        <Route path={`${this.props.match.url}/followers`} render={() => <p>Followers</p>} />
        <Route path={`${this.props.match.url}/likes`} render={() => <p>Likes</p>} />
      </StyledUser>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledUser = styled.div`
  a {
    display: block;
    font-size: 12px;
    color: blue;
  }
`;

export default User;
