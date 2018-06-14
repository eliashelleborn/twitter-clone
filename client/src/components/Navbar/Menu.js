import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Menu = ({ isAuthenticated }) => (
  <Wrapper>
    <li>
      <NavLink to="/" exact activeClassName="active">
        <i className="fas fa-home" />
        <span>Home</span>
      </NavLink>
    </li>
    {isAuthenticated && /* IF LOGGED IN */
      <React.Fragment>
        <li>
          <NavLink to="/notifications" activeClassName="active">
            <i className="far fa-bell" />
            <span>Notifications</span>
          </NavLink>
        </li>
        <li>
          <button onClick={() => console.log('Open Messages Modal')}>
            <i className="far fa-envelope" />
            <span>Messages</span>
          </button>
        </li>
      </React.Fragment>
    }
  </Wrapper>
);

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const Wrapper = styled.ul`
  height: 100%;
  font-size: 13px;
  li {
    display: inline-block;
    height: 100%;
    & > a, & > button {
      height: 100%;
      display: flex;
      padding: 0 14px;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      background: none;
      border: none;
      color: inherit;
      outline: 0;
      i {
        margin-right: 5px;
        font-size: 1.4em;
      }
      &:hover {
        text-decoration: none;
        color: #1B95E0;
        border-bottom: 2px solid #1B95E0;
      }
      &.active {
        color: #1B95E0;
        border-bottom: 2px solid #1B95E0;
      }
      
    }
  }
`;

export default Menu;
