import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Header = ({ user }) => (
  <StyledHeader>
    <UserInfo to={`/${user.username}`}>
      <strong>{user.screenName}</strong>
      <span>@{user.username}</span>
    </UserInfo>
    <Date to="/placeholder">
      <span>&middot;</span>
      <span>4 tim</span>
    </Date>
  </StyledHeader>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledHeader = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  line-height: 20px;
`;

const UserInfo = styled(NavLink)`
    text-decoration: none;
    strong {
      color: #14171a;
      margin-right: 3px;
    }
    span {
      color: #8694a0;
      margin-right: 3px;
      font-weight: normal;
    }
    &:hover {
      strong {
        text-decoration: underline;
        color: #1B95E0;
      }
    }
`;

const Date = styled(NavLink)`
  text-decoration: none;
  &:hover {
    span:last-child {
      text-decoration: underline;
      color: #1B95E0;
    }
  }
  span {
    color: #8694a0;
    margin-right: 3px;
    font-weight: normal;
  }
`;

export default Header;
